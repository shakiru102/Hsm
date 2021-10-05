const mongoose = require('mongoose')
const env = require('dotenv')
const express = require('express')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4:  uuid } = require('uuid')
const joi = require('joi')


module.exports = {
    mongoose,
    env,
    express,
    multer,
    cookieParser,
    jwt,
    bcrypt,
    uuid,
    joi
}