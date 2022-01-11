const District = require("../models/district");
const Error = require("../config/error");

class DistrictRepo {
    async createOne(id, name) {
        if (!name || name === "")
            throw new Error(400, "Bad request");

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

    async getNameByID(id) {
        try {
            const district = await District.findOne({
                attributes: ['name'],
                where: {
                    district_id: id
                }
            });
            return district['name'];
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getIDByName(name) {
        try {
            const district = await District.findOne({
                attributes: ['district_id'],
                where: {
                    name: name
                }
            });
            return district['district_id'];
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
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async updateByID(id, newName) {
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

    async count() {
        try {
            let n = await District.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let district = await District.findOne({
                where: {
                    district_id: id
                }
            })
            return district;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let district = await District.findOne({
                where: {
                    district_id: id
                }
            })
            return !(!district);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = DistrictRepo;