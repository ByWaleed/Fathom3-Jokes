import express from 'express'
import { engine } from 'express-handlebars'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fetch from 'node-fetch'

const app = express();
