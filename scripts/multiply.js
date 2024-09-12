
const name =['zero','unu','doi','trei','patru','cinci','sase','sapte','opt','noua','q1'];

let results;
results=JSON.parse(localStorage.getItem('results'));
if(!results){
    results={numarIncercari:0,numarIncercariReusite:0};
}

let nn=0;
let r = [10,10,10];
let n=[1,5];
let cresult=0;
let mresult=0;
let sresult='';
generateNumber();
renderPage();
renderScore();



function clickButton(id)
{
    console.log(`id:${id} nn:${nn}`);
    let rc=Number(id);
    if(rc<10){    
        if(nn < 2 ){
            r[nn]=rc; r[nn+1]=10;
            nn++;
        }
    } else if(rc === 10){//del
        if(nn > 0){
           r[nn-1]=10; nn--;
        }
    } else if (rc === 11 ){ //do
        if(nn === 2)
            mresult=r[0]*10+r[1];
        else
            mresult=r[0];
        results.numarIncercari++;
 //       console.log(`rezultatul este ${mresult} ${cresult}`);
        if( mresult === cresult){
            results.numarIncercariReusite++;
            sresult='Yes'
        } else{
            sresult=`Error: response is ${cresult} not ${mresult} `;
            
        }
        console.log(sresult);
        let json=JSON.stringify(results);
 //       console.log(json);
        localStorage.setItem('results',JSON.stringify(results));
        renderScore();
        nn=0; r[0]=10; 
        generateNumber();
        renderPage();
    }

 //   console.log(`${nn} ${r[0]} ${r[1]}`);
    renderPage();
}
function generateNumber()
{
    n[0]=Math.floor(Math.random() * 9 + 1);
    n[1]=Math.floor(Math.random() * 9 + 1);
    cresult=n[0]*n[1];
//    console.log(`crezult este ${cresult}`);

}
function renderPage(){
 //   console.log(`${nn} ${r[0]} ${r[1]}`);
    let html=`
        <img src="images/${name[n[0]]}.png" style="height:180px;">
        <img src="images/multiply.png" style="height:180px;">
        <img src="images/${name[n[1]]}.png" style="height:180px;">
        <img src="images/equal.png" style="height:180px;">
        <img src="images/${name[r[0]]}.png" style="height:180px;">`;
    if(nn === 2){
        html+=`<img src="images/${name[r[1]]}.png" style="height:180px;">`;
    }
//    console.log(html);
    document.getElementById('1').innerHTML=html;

}

function renderScore(){
 //   console.log(`---${results.numarIncercari}`);
    const score =`count:{numarIncercar}`;
    let html1=`
    <div> ${sresult}
    </div>
    <div id="nir"> Count:${results.numarIncercari}
    </div>
    <div style="width:500px"> Successful:${results.numarIncercariReusite} </div>
    <div>
    <div style="display:inline-block">
        <button class="button-clear" onclick="clearResults()">Clear results</button>
    </div>
    <div style="display:inline-block">
        <button class="button-clear" onclick="SendEmail()">Send email grandpa</button>
    </div></div>`;
    document.getElementById('2').innerHTML=html1;
}

function clearResults()
{
    console.log('clear');
    results.numarIncercari=0;
    results.numarIncercariReusite=0;
    localStorage.setItem('results',JSON.stringify(results));
    renderScore();
}



