cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:hud:setComponentVisible", "radar", true);

cef.emit("game:data:pollPlayerStats", true, 50);
cef.emit('grp:hud');
cef.on("data:pool:shimshili", (shimshili) => {
    document.getElementById('shimshili').textContent = shimshili;
})
cef.on("data:pool:bankmoney", (bankmoney) => {
    document.getElementById('pBank').textContent = bankmoney;
})
cef.on("data:pool:cashmoney", (cashmoney) => {
    document.getElementById('m').textContent = cashmoney;
})
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    document.getElementById('weapon').src = "./img/weapons/" + weapon + ".png";
	armors.text = arm;
});
cef.on("data:pool:health", (health) => {
        document.getElementById('healths').textContent = health;
})
cef.on("data:pool:players", (players) => {
    document.getElementById('players').textContent = players;
})
cef.on("data:pool:playerid", (playerid) => {
    document.getElementById('playerid').textContent = playerid;
})
cef.on("data:pool:giftbox", (giftbox) => {
    document.getElementById('giftboxtime').textContent = giftbox;
})
cef.on("data:pool:greenzone", (greenzone) => {
    if (greenzone) {
        document.getElementById('greenzonediv').style.display = "flex";
    }
    else {
        document.getElementById('greenzonediv').style.display = "none";
    }
})
cef.on("data:pool:radial", (radial) => {
    if (radial) {
        document.getElementById('radialka').style.display = "block";
    }
    else {
        document.getElementById('radialka').style.display = "none";
    }
})
cef.on("data:pool:fuelOn", (fuelOn) => {
    if (fuelOn) {
        document.getElementById('fuelSadguri').style.display = "block";
    }
    else {
        document.getElementById('fuelSadguri').style.display = "none";
    }
})
cef.on("data:pool:shop", (shop) => {
    if (shop) {
        document.getElementById('shop').style.display = "block";
    }
    else {
        document.getElementById('shop').style.display = "none";
    }
})
cef.on("data:pool:gpson", (gpson) => {
    if (gpson) {
        document.getElementById('gpsdiv').style.display = "flex";
        document.getElementById('gpsloc').textContent = " " + gpson;
    }
    else {
        document.getElementById('gpsdiv').style.display = "none";
        document.getElementById('gpsloc').textContent = "";
    }
})

cef.on("data:pool:channelname", (channelname) => {
    if (channelname) {
        document.getElementById('channel').style.display = "block";
        document.getElementById('channelname').textContent = " " + channelname;
    }
    else {
        document.getElementById('channel').style.display = "none";
        document.getElementById('channelname').textContent = "";
    }
})

cef.on("data:pool:wantedlevel", (wantedlevel) => {
    for(let i = 1; i <= 6; i++) {
        document.getElementById(`wanted${i}`).style.display = "none";
    }

    if(wantedlevel >= 1 && wantedlevel <= 6) {
        for(let i = 1; i <= wantedlevel; i++) {
            document.getElementById(`wanted${i}`).style.display = "flex";
        }
    }
});

cef.on("data:pool:speedometer", (speedometer) => {
    if (speedometer) {
        document.getElementById('status_speedometer').style.display = "flex";
    }
    else {
        document.getElementById('status_speedometer').style.display = "none";
    }
})

cef.on("data:vehicle", (carspeedx, cardoorx, carenginex, carfuelx) => {
    const data = {
        speed: carspeedx,
        maxSpeed: 420,
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


cef.on("data:pool:notification", (notification) => {
    switch(notification)
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

cef.on("data:pool:infotxt", (infotxt) => {
    showNotification(infotxt)
});

cef.on("data:pool:errortxt", (errortxt) => {
    showError(errortxt)
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
