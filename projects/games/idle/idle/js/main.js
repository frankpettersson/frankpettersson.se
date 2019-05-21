//Functions____________________________________________________________________
let MathUtils = {
    roundToPrecision: function(subject, precision) {
        return +((+subject).toFixed(precision));
    }
};
let mr = MathUtils.roundToPrecision;
//_____________________________________________________________________________

//Resource_____________________________________________________________________
let things = {
    value: {
        currentNumber: 0,
        totalTick: 0,
        averageTick: [0],
        totalEarned: 0,
        addNumber: 1,
        manualClickTotal: 0
    },
    game: {
        name: 'gold',
        nsName: 'gold/s',
        hires: 'miners'
    },
    ids: {
        currentNumberID: 'currentNumber',
        totalTickID: 'totalTick',
        averageTickID: 'averageTick',
        totalEarnedID: 'totalEarned',
        addNumberID: 'addNumber',
        clickUpCostID: 'clickUpCost',
        manualClickTotalID: 'manualClickTotal',
        unitbox: 'unitbox',
        baseTickID: 'basetick',
        costID: 'cost',
        tickID: 'tick',
        tickAverageID: 'tickAverage',
        hiredID: 'hired',
        earnedID: 'earned',
        activeID: 'active',
        nameID: 'name',
        buyID: 'buy'
    },
    class: {
        wrapwrapwrap: 'wrapwrapwrap',
        wrapwrap: 'wrapwrap',
        wrap: 'wrap',
        box: 'box',
        unitbox: 'unitbox',
        innerbox: 'innerbox',
        upgradebox: 'upgradebox',
        upgrade: 'upgrade',
        button: 'button',
        hire: 'hire'
    },
    units: [{
        basecost: 10.0,
        basetick: 0.1,
        cost: 10.0,
        hired: 0,
        tick: 0,
        tickAverage: [0],
        earned: 0,
        active: 0,
        activeOn: 0,
        name: 'man'
    }, 
    {
        basecost: 20.0,
        basetick: 0.2,
        cost: 20.0,
        tick: 0,
        tickAverage: [0],
        hired: 0,
        earned: 0,
        active: 0,
        activeOn: 0,
        name: 'monster'
    }, 
    {
        basecost: 40.0,
        basetick: 0.4,
        cost: 40.0,
        tick: 0,
        tickAverage: [0],
        hired: 0,
        earned: 0,
        active: 0,
        activeOn: 0,
        name: 'alien'
    },
    {
        basecost: 80.0,
        basetick: 0.8,
        cost: 80.0,
        tick: 0,
        tickAverage: [0],
        hired: 0,
        earned: 0,
        active: 0,
        activeOn: 0,
        name: 'god'
    }]
};
//_____________________________________________________________________________

//Shortenings__________________________________________________________________
let t = things;
let value = t.value;
let game = t.game;
let ids = t.ids;
let cn = value.currentNumber;
let tt = value.totalTick;
let at = value.averageTick;
let te = value.totalEarned;
let an = value.addNumber;
let mc = value.manualClickTotal;
let u = t.units;
let uLen = t.units.length;
//_____________________________________________________________________________

//Create HTML__________________________________________________________________
let www = document.createElement('div');
let ww = document.createElement('div');
let w1 = document.createElement('div');
let box1 = document.createElement('div');
let box2 = document.createElement('div');
let unitBoxWrap = document.createElement('div');
let unitBox = document.createElement('div');

www.className = 'wrapwrapwrap';
ww.className = 'wrapwrap';
w1.className = 'wrap';
box1.className = 'box';
box1.innerHTML = '<h1>'+game.name+':<span id ="currentNumber">0</span></h1>'+
                    '<p>total '+game.name+' earned:'+
                        '<b><span id="totalEarned">0</span></b>'+
                    '</p>'+
                    '<p>average '+game.nsName+':'+
                        '<b><span id="averageTick">0</span></b>'+
                    '</p>'+
                    '<p>total '+game.nsName+':'+
                        '<b><span id="totalTick">0</span></b>'+
                    '</p>';
box2.className = 'box';
box2.innerHTML = '<h3>give me '+game.name+'!</h3>'+
                    '<div class="innerBox"><div class="button" id="click">'+
                        '+<span id="addNumber">1</span> '+game.name+''+
                    '</div>'+
                    '<p>'+
                        '<b><span id="manualClickTotal">0</span></b>'+
                    ' '+game.name+' by clicks</p></div>';
unitBoxWrap.className = 'unitBoxWrap';
unitBoxWrap.innerHTML = '<h4>hire '+game.hires+'!</h4>'+
                        '<h5>'+
                            '<img src="../resources/images/arrow_open.svg" class="arrows" id="arrow0">'+
                        ' '+game.hires+'</h5>';
unitBox.className = 'unitBox';
unitBox.id = 'unitBox';

www.appendChild(ww);
ww.appendChild(w1);
w1.appendChild(box1);
w1.appendChild(box2);
w1.appendChild(unitBoxWrap);
unitBoxWrap.appendChild(unitBox);

let unit = [];
for(let i = 0; i < uLen; i++) {
    unit[i] = document.createElement('div');
    unit[i].className = 'unit';
    unit[i].innerHTML = '<div class="titleTable">'+
                            '<table>'+
                                '<tr>'+
                                    '<td>'+
                                        '<p>'+
                                            '<b>'+u[i].name+'</b>'+
                                        '</p>'+
                                    '</td>'+
                                    '<td>'+
                                        '<div class="hire" id="buy'+i+'">'+
                                            'hire!'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>'+
                                        '<p>'+
                                            '<b>'+
                                                '<span id="cost'+i+'">'+u[i].cost+'</span>'+
                                            '</b> '+game.name+
                                        '</p>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                        '</div>'+
                        '<div class="statBox">'+
                            '<div class="arrow">'+
                                '<img src="../resources/images/arrow_open.svg" class="arrows" id="arrow'+(i+1)+'">'+
                                '<p id="p1'+i+'">stats</p>'+
                            '</div>'+
                            '<p class="arrow-text" id="p2'+i+'">stats</p>'+
                            '<div class="stats" id="stats'+i+'">'+
                                '<table>'+
                                    '<tr>'+
                                        '<td>hired:</td>'+
                                        '<td>'+
                                            '<b id="hired'+i+'">'+0+'</b>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+game.name+' earned:</td>'+
                                        '<td>'+
                                            '<b id="earned'+i+'">'+0+'</b>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>total '+game.nsName+':</td>'+
                                        '<td>'+
                                            '<b id="tick'+i+'">'+0+'</b>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>average '+game.nsName+':</td>'+
                                        '<td>'+
                                            '<b id="tickAverage'+i+'">'+0+'</b>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>time active:</td>'+
                                        '<td>'+
                                            '<b id="active'+i+'">'+0+'</b>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                            '</div>'+
                        '</div>';
    unitBox.appendChild(unit[i]);
}
document.body.appendChild(www);
//_____________________________________________________________________________

//Click +______________________________________________________________________
document.getElementById('click').onclick = function addClick() {
    cn = mr(cn + an, 1);
    te = mr(te + an, 1);
    mc = mr(mc + an, 1);
    document.getElementById(ids.currentNumberID).innerHTML = cn;
    document.getElementById(ids.manualClickTotalID).innerHTML = mc;
    document.getElementById(ids.totalEarnedID).innerHTML = te;
};
//_____________________________________________________________________________

//Buy Unit_____________________________________________________________________
let selectedHire = document.getElementsByClassName('hire');
for (let i = 0; i < uLen; i++) {
    selectedHire[i].addEventListener('click', function unitBuy() {
        if (ids.buyID+i === event.target.getAttribute('id')) {
            if(cn >= u[i].cost) {
                u[i].hired++;
                cn = mr(cn - u[i].cost, 1);
                u[i].cost = Math.floor(u[i].basecost * Math.pow(1.1, u[i].hired));
                u[i].tick = mr(u[i].basetick * u[i].hired, 1);
                tt = mr(tt + u[i].basetick, 1);
                if (u[i].activeOn === 0) {
                    u[i].activeOn++;
                }
                document.getElementById('hired'+i).innerText = u[i].hired;
            }
        }
    });
}
//_____________________________________________________________________________

//Refresh Values_______________________________________________________________
function refreshValues() {
    for (let i = 0; i < uLen; i ++) {
        let arraySum = things.units[i].tickAverage.reduce((previous, current) => current += previous);
        let unitTickAverage = mr(arraySum / things.units[i].tickAverage.length, 1); 
        document.getElementById('hired'+i).innerHTML = things.units[i].hired;
        document.getElementById('tick'+i).innerHTML = things.units[i].tick;
        document.getElementById('tickAverage'+i).innerHTML = unitTickAverage;
        document.getElementById('cost'+i).innerHTML = things.units[i].cost;
        document.getElementById('earned'+i).innerHTML = things.units[i].earned;
        document.getElementById('active'+i).innerHTML = things.units[i].active;
    }
    let arraySum = at.reduce((previous, current) => current += previous);
    let totalAverage = mr(arraySum / at.length, 1); 
    document.getElementById(ids.currentNumberID).innerHTML = cn;
    document.getElementById(ids.totalTickID).innerHTML = tt;
    document.getElementById(ids.averageTickID).innerHTML = totalAverage;
    document.getElementById(ids.totalEarnedID).innerHTML = te;
    document.getElementById(ids.manualClickTotalID).innerHTML = mc;
    document.getElementById(ids.addNumberID).innerHTML = an;
}
//_____________________________________________________________________________

//Idle gain related____________________________________________________________
window.setInterval(function() {
    for (let i = 0; i < uLen; i ++) {
        let average = u[i].tickAverage;
        let active = u[i].active;
        u[i].earned = mr(u[i].earned + u[i].tick, 1);
        if (average.length < active) {
            average.unshift(u[i].tick);
        }  else if (average.length === active) {
            average.pop();
            average.unshift(u[i].tick);
        }
        if (u[i].activeOn === 1) {
            u[i].active++;
        }
    }
    cn = mr(cn + tt, 1);
    te = mr(te + tt, 1);
    if (at.length < 60) {
        at.unshift(tt);
    }  else if (at.length === 60) {
        at.pop();
        at.unshift(tt);
    }
    refreshValues();
}, 1000);
//_____________________________________________________________________________

//Hide & Show Function_________________________________________________________
//Stores state of arrow direction/hidden or shown
let arrows = new Map();
for (let i = 0; i <= 10; i++) {
    arrows.set(`arrow${i}`, 0);
}
//Listens for clicks
let selectedArrow = document.getElementsByClassName('arrows');
for (let i = 0; i <= uLen; i++) {
    selectedArrow[i].addEventListener('click', function unitBuy() {
        if ('arrow0' === event.target.getAttribute('id')) {
            let id = event.target.getAttribute('id');
            let div = event.target.parentElement.nextElementSibling.getAttribute('id');
            if(arrows.has(id) === true) {
                if(arrows.get(id) === 1) {
                    document.getElementById(id).setAttribute('src', '../resources/images/arrow_open.svg');
                    arrows.set(id, 0);
                    document.getElementById(div).style.display = 'block';
                } else if(arrows.get(id) === 0) {
                    document.getElementById(id).setAttribute('src', '../resources/images/arrow_closed.svg');
                    arrows.set(id, 1);
                    document.getElementById(div).style.display = 'none';
                }
            }
        } else if ('arrow'+i === event.target.getAttribute('id')) {
            let id = event.target.getAttribute('id');
            let div = event.target.parentElement.nextElementSibling.nextElementSibling.getAttribute('id');
            let text1 = event.target.nextElementSibling.getAttribute('id');
            let text2 = event.target.parentElement.nextElementSibling.getAttribute('id');
            if(arrows.has(id) === true) {
                if(arrows.get(id) === 1) {
                    document.getElementById(id).setAttribute('src', '../resources/images/arrow_open.svg');
                    arrows.set(id, 0);
                    document.getElementById(div).style.display = 'block';
                    document.getElementById(text1).style.display = 'block';
                    document.getElementById(text2).style.display = 'none';
                } else if(arrows.get(id) === 0) {
                    document.getElementById(id).setAttribute('src', '../resources/images/arrow_closed.svg');
                    arrows.set(id, 1);
                    document.getElementById(div).style.display = 'none';
                    document.getElementById(text1).style.display = 'none';
                    document.getElementById(text2).style.display = 'block';
                }
            }
        }
    });
}
//_____________________________________________________________________________

//Set Values Once______________________________________________________________
for (let i = 0; i < uLen; i ++) {
    u[i].tick = u[i].basetick * u[i].hired;
}
//_____________________________________________________________________________