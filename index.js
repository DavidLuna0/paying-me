const express = require('express');
const { User, Company, Skill, UserSkill } = require('./app/models');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Seja bem vindo a aplicação');
});

app.get('/users', async (req, res) => {
    await User.findAll().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send({error: err})
    });
});

app.get('/companies', async (req, res) => {
    await Company.findAll().then(result => {
        res.send(result);
    })
})

app.get('/companies/:id', async (req, res) => {
    let id = req.params.id;
    await Company.findOne({where: {id}, include: 'employes'}).then(result => {
        res.send(result);
    })
});


app.get('/users/skills', async (req, res) => {
    User.findAll({
        include: 'skills'
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    })
})

app.post('/users/skills', async (req, res) => {
    const {name, email, password, id} = req.body;
    const companyId = 1;
    User.create({name, email, password, companyId}).then(result => {
        result.addSkill([id]).then(resposta => {
            res.status(200).send(resposta);
        })
    })
})

app.post('/skills', async (req, res) => {
    const name = req.body.name;
    Skill.create({name}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    })
})

app.post('/users/:companyId', async (req, res) => {
    const {name, email, password} = req.body;
    const companyId = req.params.companyId;
    await User.create({name, email, password, companyId}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send({error: err});
    });
});

app.post('/companies', async (req, res) => {
    const name = req.body.name;
    await Company.create({name}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send({error: err})
    })
})

app.get('/users/:id',async (req, res) => {
    await User.findByPk(req.params.id).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send({error: err});
    })
});

app.put('/users/:id',async (req, res) => {
    const {name, email, password} = req.body;
    const id = req.params.id;
    User.update({name, email, password}, {where: {id}}).then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.send({error: err});
    })
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(user => {
        user.destroy().then(result => {
            res.send(result);
        });
    }).catch(err => {
        res.send({error: err})
    })
});

app.listen(3000);
console.log("Servidor escutando na porta 3000");