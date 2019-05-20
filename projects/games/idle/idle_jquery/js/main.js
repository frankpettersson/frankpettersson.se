//Math Functions_______________________________________________________________
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
        clickUpCost: 10,
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
        unitbox: 'unitBox',
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
        unitbox: 'unitBox',
        innerbox: 'innerbox',
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
        singularName: 'man',
        pluralName: 'men'
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
        singularName: 'monster',
        pluralName: 'monsters'
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
        singularName: 'alien',
        pluralName: 'aliens'
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
        singularName: 'god',
        pluralName: 'gods'
    }]
};
//______________________________________________________________________________

//Values_______________________________________________________________________
let t = things;
let uLen = t.units.length;
let value = t.value;
let game = t.game;
let ids = t.ids;
let classes = t.class; 
let u = t.units;
let cn = value.currentNumber;
let tt = value.totalTick;
let at = value.averageTick;
let te = value.totalEarned;
let cu = value.clickUpCost;
let an = value.addNumber;
let mc = value.manualClickTotal;
let gn = game.name;
let gs = game.nsName;
let gh = game.hires;
//_____________________________________________________________________________

//Refresh Values_______________________________________________________________
function refreshValues() {
    $.each(u, function(i) {
        $.each(u[i], function() {
            let hi = u[i].hired;
            let tc = u[i].tick;
            let ta = u[i].tickAverage;
            let co = u[i].cost;
            let ea = u[i].earned;
            let ac = u[i].active;
            let hiid = ids.hiredID+i;
            let tcid = ids.tickID+i;
            let taid = ids.tickAverageID+i;
            let coid = ids.costID+i;
            let eaid = ids.earnedID+i;
            let acid = ids.activeID+i;
            let arraySum = ta.reduce((previous, current) => current += previous);
            let unitTickAverage = mr(arraySum / ta.length, 1); 
            $('#'+hiid).html(hi);
            $('#'+tcid).html(tc);
            $('#'+taid).html(unitTickAverage);
            $('#'+coid).html(co);
            $('#'+eaid).html(ea);
            $('#'+acid).html(ac);
        });
    });
    let arraySum = at.reduce((previous, current) => current += previous);
    let totalAverage = mr(arraySum / at.length, 1); 
    $('#'+ids.currentNumberID).html(cn);
    $('#'+ids.totalTickID).html(tt);
    $('#'+ids.averageTickID).html(totalAverage);
    $('#'+ids.totalEarnedID).html(te);
    $('#'+ids.clickUpCostID).html(cu);
    $('#'+ids.manualClickTotalID).html(mc);
    $('#'+ids.addNumberID).html(an);
}
//_____________________________________________________________________________

//Click +______________________________________________________________________
$(document).ready(function() {
    $('#click').click(function addClick() {
        cn = mr(cn + an, 1);
        te = mr(te + an, 1);
        mc = mr(mc + an, 1);
        $('#'+ids.currentNumberID).html(cn);
        $('#'+ids.manualClickTotalID).html(mc);
        $('#'+ids.totalEarnedID).html(te);
    });
});
//_____________________________________________________________________________

//Buy Unit_____________________________________________________________________
$(document).ready(function() {
    $('.hire').click(function unitBuy() {
        $.each(u, function(i) {
            if (ids.buyID+i === event.target.id) {
                if(cn >= u[i].cost) {
                    u[i].hired++;
                    cn = mr(cn - u[i].cost, 1);
                    u[i].cost = Math.floor(u[i].basecost * Math.pow(1.1, u[i].hired));
                    u[i].tick = mr(u[i].basetick * u[i].hired, 1);
                    tt = mr(tt + u[i].basetick, 1);
                    if (u[i].activeOn === 0) {
                        u[i].activeOn++;
                    }
                    refreshValues();
                }
            }
        });
    });
});
//_____________________________________________________________________________

//Idle gain related____________________________________________________________
window.setInterval(function(){
    $.each(u, function(i) {
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
    });
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

//Create HTML Body_____________________________________________________________
$('body').append($('<div>', {
    class: classes.wrapwrapwrap
})
    .append($('<div>', {
        class: classes.wrapwrap
    })
        .append($('<div>', {
            class: classes.wrap
        })
            .append($('<div>', {
                class: classes.box
            })
                .append($('<h1>')
                    .text(gn+':')
                    .append($('<span>', {
                        id: ids.currentNumberID
                    }))
                )
                .append($('<p>')
                    .append('total '+gn+' earned:')
                    .append($('<b>')
                        .append($('<span>', {
                            id: ids.totalEarnedID
                        }))
                    )
                )
                .append($('<p>')
                    .append('average '+gs+':')
                    .append($('<b>')
                        .append($('<span>', {
                            id: ids.averageTickID
                        }))
                    )
                )
                .append($('<p>')
                    .append('total '+gs+':')
                    .append($('<b>')
                        .append($('<span>', {
                            id: ids.totalTickID
                        }))
                    )
                )
            )
            .append($('<div>', {
                class: classes.box
            })
                .append($('<h3>')
                    .text('give me '+gn+'!')
                )
                .append($('<div>', {
                    class: 'innerBox'
                })
                    .append($('<div>', {
                        class: classes.button,
                        id: 'click'
                    })
                        .append('+')
                        .append($('<span>', {
                            id: ids.addNumberID
                        }))
                        .append(' '+gn)
                    )
                    .append($('<p>')
                        .append($('<b>')
                            .append($('<span>', {
                                id: ids.manualClickTotalID
                            }))
                        )
                        .append(' '+gn+' by clicks')
                    )
                    
                )
            )
            .append($('<div>', {
                class: 'unitBoxWrap'
            })
                .append($('<h4>')
                    .append('hire '+gh+'!')
                )
                .append($('<h5>')
                    .append($('<img>', {
                        src: '../resources/images/arrow_open.svg',
                        style: 'width: 13px; height: 13px;',
                        class: 'arrow',
                        id: 'arrow1'
                    }))
                    .append(' '+game.hires)
                )
                .append($('<div>', {
                    class: classes.unitbox,
                    id: 'units'
                })
                )
            )
        )
    )
);
//_____________________________________________________________________________

//Create Unit Elements_________________________________________________________
for(let i = 0; i < uLen; i++) {
    $('.'+classes.unitbox).append($('<div>', {
        class: 'unit'
    })  
        .append($('<div>', {
            class: 'titleTable'
        })
            .append($('<table>')
                .append($('<tr>')
                    .append($('<td>')
                        .append($('<p>')
                            .append($('<b>', {
                                id: ids.nameID+i
                            }))
                        )
                    )
                    .append($('<td>')
                        .append($('<div>', {
                            class: classes.hire,
                            id: ids.buyID+i
                        })
                            .append('hire!')
                        )
                    )
                    .append($('<td>')
                        .append($('<p>')
                            .append($('<b>', {
                                id: ids.costID+i
                            }))
                            .append(' '+gn)
                        )
                    )
                )
            )
        )
        .append($('<div>', {
            class: 'statBox'
        })
            .append($('<div>', {
                class: 'arrow'
            })
                .append($('<img>', {
                    src: '../resources/images/arrow_open.svg',
                    style: 'width: 15px; height: 15px;',
                    id: 'arrow'+(i+2)
                }))
                .append($('<p>', {
                    id: 'p1'+i
                })
                    .text('stats')
                )
            )
            .append($('<p>', {
                id: 'p2'+i,
                style: 'display: none'
            })
                .text('stats')
            )
            .append($('<div>', {
                class: 'stats',
                id: 'stats'+i
            })
                .append($('<table>')
                    .append($('<tr>')
                        .append($('<td>')
                            .text('hired:')
                        )
                        .append($('<td>')
                            .append($('<b>')
                                .append($('<span>', {
                                    id: ids.hiredID+i
                                }))
                            )
                        )
                    )
                    .append($('<tr>')
                        .append($('<td>')
                            .text(gn+' earned:')
                        )
                        .append($('<td>')
                            .append($('<b>')
                                .append($('<span>', {
                                    id: ids.earnedID+i
                                }))
                            )
                        )
                    )
                    .append($('<tr>')
                        .append($('<td>')
                            .text('total '+gs+':')
                        )
                        .append($('<td>')
                            .append($('<b>')
                                .append($('<span>', {
                                    id: ids.tickID+i
                                }))
                            )
                        )
                    )
                    .append($('<tr>')
                        .append($('<td>')
                            .text('average '+gs+':')
                        )
                        .append($('<td>')
                            .append($('<b>')
                                .append($('<span>', {
                                    id: ids.tickAverageID+i
                                }))
                            )
                        )
                    )
                    .append($('<tr>')
                        .append($('<td>')
                            .text('time active:')
                        )
                        .append($('<td>')
                            .append($('<b>')
                                .append($('<span>', {
                                    id: ids.activeID+i
                                }))
                            )
                        )
                    )
                )
            )
        )
    );
}
//_____________________________________________________________________________

//Hide & Show Function_________________________________________________________
let arrows = new Map();
for (let i = 0; i <= 10; i++) {
    arrows.set(`arrow${i}`, 0);
}

$(document).ready(function() { 
    $('.arrow').click(function hideShow() {
        let id = event.target.id;
        let container = $(event.target).parent().next('div').attr('id');
        let target = $(event.target).parent().next().next().attr('id');
        let text1 = $(event.target).next().attr('id');
        let text2 = $(event.target).parent().next('p').attr('id');
        if(arrows.has(id) === true) {
            if(arrows.get(id) === 1) {
                $('#'+id).attr('src', '../resources/images/arrow_open.svg');
                arrows.set(id, 0);
                $('#'+container).show('slow');
                $('#'+target).show(1000);
                $('#'+text1).show(1000);
                $('#'+text2).hide(1);
            } else if(arrows.get(id) === 0) {
                $('#'+id).attr('src', '../resources/images/arrow_closed.svg');
                arrows.set(id, 1);
                $('#'+container).hide('slow');
                $('#'+target).hide(1);
                $('#'+text1).hide(1);
                $('#'+text2).show(1000);
            }
        }
    });
});
//_____________________________________________________________________________

//Set Values Once______________________________________________________________
$.each(u, function(i) {
    $('#'+ids.nameID+i).html(u[i].singularName);
    $('#'+ids.baseTickID+i).html(u[i].basetick);
    u[i].tick = u[i].basetick * u[i].hired;
});
//_____________________________________________________________________________
refreshValues();