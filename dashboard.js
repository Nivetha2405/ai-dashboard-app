const machines = [
    {'name':'Engine Line A','runtime':8,'downtime':1,'output':120,'risk':'Low','recommendation':'Continue operation'},
    {'name':'Engine Line B','runtime':9,'downtime':1.5,'output':115,'risk':'Medium','recommendation':'Schedule maintenance'},
    {'name':'Paint Line','runtime':10,'downtime':3,'output':90,'risk':'High','recommendation':'Check paint quality'},
    {'name':'Assembly Line','runtime':12,'downtime':2,'output':110,'risk':'Medium','recommendation':'Monitor assembly'}
];

function showDetails(machineName){
    const machine = machines.find(m => m.name === machineName);
    document.getElementById('modal-name').innerText = machine.name;
    document.getElementById('modal-runtime').innerText = machine.runtime;
    document.getElementById('modal-downtime').innerText = machine.downtime;
    document.getElementById('modal-output').innerText = machine.output;
    document.getElementById('modal-risk').innerText = machine.risk;
    document.getElementById('modal-recommendation').innerText = machine.recommendation;
    document.getElementById('detailModal').style.display = 'block';
}

function closeModal(){
    document.getElementById('detailModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard loaded");
});
