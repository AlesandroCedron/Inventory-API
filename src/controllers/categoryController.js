import * as service from '../services/categoryService.js';

export async function getAllCategoriesHandler(req, res, next) {
  try {
    const data = await service.getAllCategories();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getCategoryByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const data = await service.getCategoryById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function createCategoryHandler(req, res, next) {
  try {
    const data = await service.createCategory(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function updateCategoryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const data = await service.updateCategory(id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategoryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await service.deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}