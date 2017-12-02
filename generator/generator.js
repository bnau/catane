const Mustache = require('mustache');
const fs = require('fs');
const rimraf = require('rimraf');
const fileUtil = require('./fileUtil');

const rootDir = __dirname + '/../';

const beanDir = rootDir+'common/beans/';
const mongooseDir = rootDir+'server/models/';

rimraf.sync(beanDir);
rimraf.sync(mongooseDir);

let resourcesDir = __dirname + '/resources/';

const files = fs.readdirSync(resourcesDir);

files.forEach(fileName => generateFile(fileName));

function generateFile(fileName) {
    let data = getData(fileName);
    generateBean(fileName, data);
    generateMongoose(fileName, data);
}

function getData(fileName) {
    const path = resourcesDir+fileName;

    let file = fs.readFileSync(path, {encoding: 'utf-8'});

    let plural = fileUtil.extract('plural:',file);

    let fieldArray = fileUtil.extract('fields:',file).split(',');
    let fields = fieldArray.map(line => {return {name: line.split('/')[0],
        type: line.split('/')[1],
    required: line.split('/')[2]}})

    return {
        upperName: fileName.charAt(0).toUpperCase() + fileName.slice(1),
        plural,
        fileName,
        fields,
        fieldsLessId: fields.filter(f=>f.name!='id')
    }
}

function generateBean(fileName, data) {
    let beanTemplate = fs.readFileSync(__dirname+'/bean.template', {encoding: 'utf-8'});

    fileUtil.createWriteFile(beanDir+fileName+'.ts', Mustache.render(beanTemplate, data));
}

function generateMongoose(fileName, data) {
    let mongooseTemplate = fs.readFileSync(__dirname+'/mongoose.template', {encoding: 'utf-8'});

    fileUtil.createWriteFile(mongooseDir+fileName+'.ts', Mustache.render(mongooseTemplate, data));
}