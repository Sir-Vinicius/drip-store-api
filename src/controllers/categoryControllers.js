const categoryModel = require('../models/categoryModel');

const getAll = async (req, res) => {
  try {
    const {
      limit = 12, 
      page = 1, 
      fields = 'id,name,slug,use_in_menu',
      use_in_menu,
    } = req.query;

    if (!limit || isNaN(parseInt(limit, 10)) || parseInt(limit, 10) <= 0) {
      return res.status(400).json({
        error: 'Erro na requisição. Parâmetro "limit" inválido.',
      });
    }

    if (!page || isNaN(parseInt(page, 10)) || parseInt(page, 10) <= 0) {
      return res.status(400).json({
        error: 'Erro na requisição. Parâmetro "page" inválido.',
      });
    }

    const queryLimit = parseInt(limit);
    const queryPage = parseInt(page);

    const attributes = fields.split(',');

    const queryOptions = {
      attributes,
      where: {},
    };

    if (queryLimit !== -1) {
      queryOptions.limit = queryLimit;
      queryOptions.offset = (queryPage - 1) * queryLimit;
    }

    if (use_in_menu !== undefined) {
      queryOptions.where.use_in_menu = use_in_menu === 'true';
    }

    const categories = await categoryModel.findAll(queryOptions);

    res.status(200).json({
      message: 'Categorias recuperadas com sucesso.',
      data: categories,
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id) 
  try {
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'ID inválido. Deve ser um número positivo.',
      });
    }
    const category = await categoryModel.findByPk(id, {
      attributes: ['id', 'name', 'slug', 'use_in_menu'],
    });
    
    if (!category) {
      return res.status(404).json({
        message: `Categoria com ID ${id} não encontrada.`,
      });
    }

    return res.status(200).json({
      status: 'success',
      data: category.toJSON(), 
    });

  } catch (error) {
    console.error('Error fetching category:', error);

    return res.status(500).json({
      message: 'Erro interno do servidor ao buscar categoria.'
    });
  }
}

const create = async(req, res) => {
  const { name, slug, use_in_menu } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Nome e slug são obrigatórios." });
  }

  if (use_in_menu !== undefined && typeof use_in_menu !== 'boolean') {
    return res.status(400).json({ message: "'use_in_menu' deve ser um valor booleano." });
  }

  try {
    const category = await categoryModel.create({
      name,
      slug,
      use_in_menu
    });

    return res.status(201).json({
      category
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    
    const category = await categoryModel.findByPk(id);

    if (!category) {
    
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    await category.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, use_in_menu } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Nome e slug são obrigatórios." });
  }

  try {
   
    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    
    category.name = name;
    category.slug = slug;
    category.use_in_menu = use_in_menu !== undefined ? use_in_menu : category.use_in_menu;

    await category.save();

    return res.status(204)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};




module.exports = {
  getAll, getById, create, deleteCategory, updateCategory
}
