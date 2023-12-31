"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientService = exports.updateClientService = exports.postClientService = exports.displayOneClientService = exports.displayClientService = void 0;
const clientEntities_1 = require("../model/clientEntities");
const db_1 = require("../db");
const clientRepository = db_1.AppDataSource.getRepository(clientEntities_1.Client);
const displayClientService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield clientRepository.find();
        res.status(200).json(client);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
});
exports.displayClientService = displayClientService;
const displayOneClientService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const client = yield clientRepository.findOne({ where: { id: parseInt(id) } });
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(client);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente' });
    }
});
exports.displayOneClientService = displayOneClientService;
const postClientService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, email, tel } = req.body;
    if (!name || !last_name || !email || !tel) {
        return res.status(400).json({ message: 'Campos incompletos' });
    }
    const client = new clientEntities_1.Client();
    client.name = name;
    client.email = email;
    client.last_name = last_name;
    client.tel = tel;
    try {
        const savedClient = yield clientRepository.save(client);
        res.status(201).json(savedClient);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente' });
    }
});
exports.postClientService = postClientService;
const updateClientService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, last_name, email, tel } = req.body;
    try {
        const updateResult = yield clientRepository.update({ id: parseInt(id) }, {
            name: name,
            last_name: last_name,
            email: email,
            tel: tel,
        });
        if (updateResult.affected === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        return res.json('Usuario Actualizado');
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
});
exports.updateClientService = updateClientService;
const deleteClientService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield clientRepository.delete({ id: parseInt(id) });
    console.log(result);
    return res.sendStatus(204);
});
exports.deleteClientService = deleteClientService;
