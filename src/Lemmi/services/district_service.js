const DistrictRepo = require("../repos/district_repo");
const Error = require("../config/error");

const rDistrict = new DistrictRepo();

class DistrictService {
    async createDistrict(district) {
        const { name } = district;

        if (!name || name == "")
            throw new Error(400, "Bad request");
        
        try {
            const createdDistrict = await rDistrict.createDistrict(name);
            return createdDistrict;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllDistrict() {
        try {
            const district = await rDistrict.getAll();
            return district;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllDistrictName() {
        try {
            const districts = await rDistrict.getAllName();
            return districts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updateDistrictByID(district) {
        const { district_id, name } = district;

        if (!district_id || !name || name == "")
            throw new Error(400, "Bad request");

        try {
            await rDistrict.updateDistrict(district_id, name);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteDistrictByID(id) {
        try {
            await rDistrict.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
}

module.exports = DistrictService;