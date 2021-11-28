const District = require("../models/district");
const Error = require("../config/error");

class DistrictRepo {
    async createDistrict(name) {
        let id = await this.generateNewID();
        try {
            const newDistrict = await District.create({
                district_id: id,
                name: name,
            });
            return newDistrict;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const districts = await District.findAll();
            return districts;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getAllName() {
        try {
            const districts = await District.findAll({
                attributes: ['name']
            });
            let name = [];
            for (let i = 0; i < districts.length; i++) {
                name.push(districts[i]['name'])
            }
            return name;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByName(name) {
        try {
            await District.destroy({
                where: {
                    name: name
                }
            });
            return true;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await District.destroy({
                where: {
                    district_id: id 
                }
            });
            return true;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async updateDistrict(id, newName) {
        try {
            await District.update({name: newName}, {
                where: {
                    district_id: id 
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async generateNewID() {
        let id = await District.count();
        id = id.toString(16);
        while (id.length < 10)
            id = '0' + id;
        return id;
    }
}

module.exports = DistrictRepo;