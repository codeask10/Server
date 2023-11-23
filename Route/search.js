const express = require('express');
const router = express.Router();
const USER = require("../Model/User");

router.get("/searchByName", async (req, res) => {
    try {
        let success=false;
        var query = req.query.search;
        const query_data = await USER.find({
            $or: [
                { "first_name": { $regex: ".*" + query + ".*", $options: 'i' } },
                { "last_name": { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        });

        if (query_data === 0) {
            return res.status(200).json({ success, error: "Data is not found" })
        }
        success=true;
        res.json({success,query_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});
router.get('/domains', async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('domain');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/gender', async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('gender');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/available', async (req, res) => {
    try {
        const queryObject={};
        queryObject.available=true
        const uniqueAvailable =   await USER.find(queryObject);
        
        res.json(uniqueAvailable);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get("/searchByFilter", async (req, res) => {
    let success = false;
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available =req.query.available;
        const queryObject={};
        if(domain){
            queryObject.domain=domain;
        }
        if(gender){
            queryObject.gender=gender;
        }
        if(available==="true"){
            queryObject.available=true
        }
        if(available==="false"){
            queryObject.available=false
            
        }
        const filter_data = await USER.find(queryObject);

        if (filter_data.length === 0) {
            return res.status(200).json({ success, error: "Data is not found" })

        } 
        success=true
        res.json({success,filter_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});


module.exports = router; 