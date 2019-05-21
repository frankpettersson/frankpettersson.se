let root = {
    units: [],
    lastUnit: 'Coins',
    unitNumber: 0,
    coinVal: 0,
    init: function () {
        this.createUnit('Goblin');
        this.createUnit('Ogre');
        this.createUnit('Orc');
    },
    getCoin: function () {
        this.coinVal++;
        document.getElementById('coin').innerText = this.coinVal;
    },
    createUnit: function (name = this.defaultUnitName + this.unitNumber, cost = 10, owned = 0) {
        //unit element variables
        let unit = document.createElement('tr');
        let unitName = document.createElement('td');
        let unitCreates = document.createElement('td');
        let unitOwned = document.createElement('td');
        let unitCost = document.createElement('td');

        //create new object for the new unit
        this.units[this.unitNumber] = {};
        this.units[this.unitNumber]['name'] = name;
        this.units[this.unitNumber]['cost'] = cost;
        this.units[this.unitNumber]['owned'] = owned;

        //assign unit specifications to table entries
        unitOwned.id = 'owned' + this.unitNumber;
        unitCost.className = 'unit button';
        unitCost.setAttribute('data-value', this.unitNumber);
        unitCost.setAttribute('onclick', 'root.buyUnit(this)');
        this.setValue(unitName, name);
        this.setValue(unitCost, cost + ' ' + this.lastUnit);
        this.setValue(unitCreates, this.lastUnit);
        this.setValue(unitOwned, owned);

        //append table entries to tables
        unit.appendChild(unitName);
        unit.appendChild(unitCreates);
        unit.appendChild(unitOwned);
        unit.appendChild(unitCost);
        document.getElementById('table').appendChild(unit);

        //set last unit as this one
        this.lastUnit = name + 's';

        //increment unit number
        this.unitNumber++;
    },
    newUnit: function (click = false) {
        if (click === true) {
            let name = document.getElementById('name').value;
            if (name !== "") {
                this.createUnit(name)
                document.getElementById('name').value = '';
                document.getElementById('error-unit').style.display = 'none';
                document.getElementById('error-create').style.display = 'none';
            } else {
                document.getElementById('error-unit').style.display = 'none';
                this.error('Please enter a name', 'error-create');
            }
        }
    },
    buyUnit: function (element) {
        let i = element.getAttribute('data-value');
        if (i == 0) {
            if (this.coinVal >= this.units[i].cost) {
                this.units[i].owned++;
                this.coinVal -= this.units[i].cost;
                let id = 'owned' + i;
                document.getElementById(id).innerText = this.units[i].owned;
                document.getElementById('coin').innerText = this.coinVal;
                document.getElementById('error-unit').style.display = 'none';
                document.getElementById('error-create').style.display = 'none';
            } else {
                document.getElementById('error-create').style.display = 'none';
                this.error('We require more Coins', 'error-unit');
            }
        } else if (i >= 1) {
            if (this.units[i - 1].owned >= this.units[i].cost) {
                this.units[i].owned++;
                this.units[i - 1].owned -= this.units[i].cost;
                let buying = 'owned' + i;
                let currency = 'owned' + (i - 1);
                document.getElementById(buying).innerText = this.units[i].owned;
                document.getElementById(currency).innerText = this.units[i - 1].owned;
                document.getElementById('error-unit').style.display = 'none';
                document.getElementById('error-create').style.display = 'none';
            } else {
                document.getElementById('error-create').style.display = 'none';
                this.error('We require more ' + this.units[i - 1].name + 's', 'error-unit');
            }
        }
    },
    setValue: function (element, value = element.innerText) {
        element.innerText = value;
    },
    error: function (message, type) {
        let error;
        if (type == 'error-create') {
            error = document.getElementById('error-create');
        } else if (type == 'error-unit') {
            error = document.getElementById('error-unit');
        }
        error.innerText = message;
        error.style.display = 'block';
    }
}
root.init();

document.querySelector('#get-coin').addEventListener('click', root.getCoin());
document.querySelector('#unit').addEventListener('click', root.newUnit(true));

//TICKER
let fpsInterval, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    loop();
}
startAnimating(1);

function loop() {
    requestAnimationFrame(loop);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        root.coinVal += 1 * root.units[0].owned;
        for (let i = 0; i < root.units.length - 1; i++) {
            root.units[i].owned += 1 * root.units[i + 1].owned
            let owned = 'owned' + i;
            document.getElementById(owned).innerText = root.units[i].owned;
        }
        document.getElementById('coin').innerText = root.coinVal;
    }
}