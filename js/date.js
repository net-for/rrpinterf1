
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const timeString = hours + ':' + minutesStr + ' ' ;
    $('#clock').text(timeString);

    const currentMonth = now.getMonth() + 1; 

    var month = '';
    
    switch(currentMonth) {
        case 1: {
            month = 'იანვარი';
            break;
        }
        case 2: {
            month = 'თებერვალი';
            break;
        }
        case 3: {
            month = 'მარტი';
            break;
        }
        case 4: {
            month = 'აპრილი';
            break;
        }
        case 5: {
            month = 'მაისი';
            break;
        }
        case 6: {
            month = 'ივნისი';
            break;
        }
        case 7: {
            month = 'ივლისი';
            break;
        }
        case 8: {
            month = 'აგვისტო';
            break;
        }
        case 9: {
            month = 'სექტემბერი';
            break;
        }
        case 10: {
            month = 'ოქტომბერი';
            break;
        }
        case 11: {
            month = 'ნოემბერი';
            break;
        }
        case 12: {
            month = 'დეკემბერი';
            break;
        }
        default: {
            month = 'იდკ';
        }
    
    }
    
    $('#month').text(month);
    


}

updateClock();
setInterval(updateClock, 1000);