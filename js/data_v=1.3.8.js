cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:hud:setComponentVisible", "radar", true);

cef.emit("game:data:pollPlayerStats", true, 50);
cef.emit('grp:hud');
cef.on("data:pool:bankmoney", (bankmoney) => {
    document.getElementById('pBank').textContent = bankmoney;
})
cef.on("data:pool:cashmoney", (cashmoney) => {
    document.getElementById('m').textContent = cashmoney;
})
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    document.getElementById('weapon').src = "./img/weapons/" + weapon + ".png";
    const healthDiv = document.querySelector('.health');
    healthDiv.style.width = hp + '%';

    const armorDiv = document.querySelector('.armor');
    armorDiv.style.width = arm + '%';
});
cef.on("data:pool:giftbox", (giftbox) => {
    document.getElementById('bonustime').textContent = giftbox;
})
cef.on("data:pool:greenzonex", (greenzonex) => {
    if (greenzonex) {
        document.getElementById('greenzonediv').style.display = "flex";
    }
    else {
        document.getElementById('greenzonediv').style.display = "none";
    }
})
cef.on("data:pool:gpsonc", (gpsonc) => {
    if (gpsonc) {
        document.getElementById('gpsdiv').style.display = "flex";
        document.getElementById('gpsloc').textContent = " " + gpson;
    }
    else {
        document.getElementById('gpsdiv').style.display = "none";
        document.getElementById('gpsloc').textContent = "";
    }
})

cef.on("data:pool:wantedlevelx", (wantedlevelx) => {
    for(let i = 1; i <= 6; i++) {
        document.getElementById(`wanted${i}`).style.display = "none";
    }

    if(wantedlevelx >= 1 && wantedlevelx <= 6) {
        for(let i = 1; i <= wantedlevel; i++) {
            document.getElementById(`wanted${i}`).style.display = "flex";
        }
    }
});

cef.on("data:pool:speedometerx", (speedometerx) => {
    if (speedometerx) {
        document.getElementById('status_speedometer').style.display = "flex";
    }
    else {
        document.getElementById('status_speedometer').style.display = "none";
    }
})

cef.on("data:vehiclex", (carspeedx, cardoorx, carenginex, carfuelx) => {
    const data = {
        speed: carspeedx,
        maxSpeed: 260,
        fuelLevel: carfuelx,
        maxFuelLevel: 100,
        engineOn: carenginex,
        doorsLocked: cardoorx,
    };

    updateDashboard(data);

    function updateDashboard(data) {
        const speedPercentage = data.speed / data.maxSpeed;
        const speedOffset = 504.295 * (1 - speedPercentage); 
        document.getElementById('hud-speedometer').style.strokeDashoffset = speedOffset;

        const fuelPercentage = data.fuelLevel / data.maxFuelLevel;
        const fuelOffset = 208.907 * (1 - fuelPercentage); 
        document.getElementById('hud-fuel').style.strokeDashoffset = fuelOffset;

        document.getElementById('textspeed').textContent = data.speed;

        const engineElement = document.getElementById('eng');
        engineElement.classList.toggle('off', !data.engineOn);
        engineElement.classList.toggle('on', data.engineOn);

        const doorElement = document.getElementById('door');
        doorElement.classList.toggle('off', !data.doorsLocked);
        doorElement.classList.toggle('on', data.doorsLocked);
    }

});


cef.on("data:pool:notificationx", (notificationx) => {
    switch(notificationx)
    {
        case 1:
            {
                showNotification("მანქანის ძრავი წარმატებით დაიქოქა");
                break;
            }
        case 2:
            {
                showNotification("მანქანის ძრავი წარმატებით ჩაქვრა");
                break;
            }
        case 3:
            {
                showNotification("მანქანის კარი წარმატებით გაიღო");
                break;
            }
        case 4:
            {
                showNotification("მანქანის კარი წარმატებით დაიხურა");
                break;
            }
    }
});

cef.on("data:pool:infotxtc", (infotxtc) => {
    showNotification(infotxtc)
});

cef.on("data:pool:errortxtx", (errortxtx) => {
    showError(errortxtx)
});

const bar = document.getElementById('notification-bar');
const message = document.getElementById('message');
let timeoutId = null;

function showNotification(text) {
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }

    message.textContent = text;
    bar.classList.remove('hidden');
    bar.classList.remove('error');
    bar.classList.add('notification');
    bar.classList.add('visible');

    timeoutId = setTimeout(function () {
        bar.classList.remove('visible');
        bar.classList.add('hidden');
        timeoutId = null; 
    }, 3000);
}

function showError(text) {
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }

    message.textContent = text;
    bar.classList.remove('hidden');
    bar.classList.remove('notification');
    bar.classList.add('error');
    bar.classList.add('visible');
    
    timeoutId = setTimeout(function () {
        bar.classList.remove('visible');
        bar.classList.add('hidden');
        timeoutId = null; 
    }, 3000);
}
