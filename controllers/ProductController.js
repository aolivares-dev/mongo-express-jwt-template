'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Products = require('..\\models\\Product');

router.post("/", async (req, res) => {
	try {
		const { name, description, price } = req.body;

		console.log(req.body); // Verifica que los datos se reciban correctamente

		const product = new Products({
			name,
			description,
			price
		});
		await product.save();

		return res.json(product);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const products = await Products.find();

		return res.json(products);

	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Validar el ID
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'ID de producto no válido' });
		}

		// Consultar el producto por su ID
		const product = await Products.findById(id);

		// Verificar si el producto existe
		if (!product) {
			return res.status(404).json({ error: 'Producto no encontrado' });
		}

		// Si se encuentra el producto, devolverlo como respuesta
		res.json(product);
	} catch (error) {
		console.error(error.message); // Loguea el error para propósitos de depuración
		res.status(404).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const { name, description, price } = req.body;

		// Validar el ID
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'ID de producto no válido' });
		}

		// Actualizar el producto por su ID
		const updatedProduct = await Products.findByIdAndUpdate(id, { name, description, price }, { new: true, runValidators: true });

		// Verificar si el producto existe
		if (!updatedProduct) {
			return res.status(404).json({ error: 'Producto no encontrado' });
		}

		// Si se actualiza correctamente, devolver el producto actualizado como respuesta
		res.json(updatedProduct);
	} catch (error) {
		console.error(error.message); // Loguea el error para propósitos de depuración
		res.status(500).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Validar el ID
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'ID de producto no válido' });
		}

		// Eliminar el producto por su ID
		const deletedProduct = await Products.findByIdAndDelete(id);

		// Verificar si el producto existe
		if (!deletedProduct) {
			return res.status(404).json({ error: 'Producto no encontrado' });
		}

		// Si se elimina correctamente, devolver un mensaje de éxito junto con el producto eliminado
		res.json({ message: 'Producto eliminado exitosamente', deletedProduct });
	} catch (error) {
		console.error(error.message); // Loguea el error para propósitos de depuración
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
