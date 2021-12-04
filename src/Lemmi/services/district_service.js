const DistrictRepo = require("../repos/district_repo");
const Error = require("../config/error");

const rDistrict = new DistrictRepo();

class DistrictService {
    async createDistrict(district) {
        const { name } = district;

        if (!name || name == "")
            throw new Error(400, "Bad request");
        
        try {
            let id = await this.generateNewID();
            const createdDistrict = await rDistrict.createOne(id, name);
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
            await rDistrict.updateByID(district_id, name);
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

    async generateNewID() {
        let id = await rDistrict.count();
        let dis_id = await this.toStringID(id);
        const max_id = Math.pow(16,10) - 1;

        while (true) {
            let exist = await rDistrict.isExistID(dis_id);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                dis_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return dis_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 10)
            str = '0' + str;
        return str;
    }
}

module.exports = DistrictService;