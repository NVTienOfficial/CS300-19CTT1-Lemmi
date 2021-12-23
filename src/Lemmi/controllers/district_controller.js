const router = require("express").Router();
const auth =  require("../middleware/auth");

const DistrictService = require("../services/district_service");

const sDistrict = new DistrictService();

router.post("/create", async (req, res) => {
    try {
        let district = await sDistrict.createDistrict(req.body);
        return res.status(201).json({
            status: "OK",
            message: "success",
            data: district,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        let districts = await sDistrict.getAllDistrict();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: districts,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/all", async (req, res) => {
    try {
        let districts = await sDistrict.getAllDistrictName();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: districts,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.put("", async (req, res) => {
    try {
        await sDistrict.updateDistrictByID(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sDistrict.deleteDistrictByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;