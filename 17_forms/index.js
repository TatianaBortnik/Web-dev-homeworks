//------------- GET
/* Creates table row with information about refund
*/

function createTableRow(row, table){
    let tr = document.createElement('tr');
    let date = new Date(row.createdAt*1);
    tr.innerHTML = `<td>${date.toLocaleString()}</td>`+
      `<td>${row.name}</td><td>${row.debtor}</td><td>${row.amount}</td><td>${row.dueDate}</td>`+
      `<td><input type="image" src="trash-can-2.svg" name="deleteRefund" id="${row.id}" /></td><td>${row.id}</td>`;
    table.appendChild(tr);
    // append onclick event to delete button
    const btn = document.getElementById(row.id);
    btn.onclick = async (event) => {
      if (confirm('Record will be deleted. Are you sure?')) {
        let result = await deleteRefund(event.target.id);
        console.log(result);
      }
      
    }
}


async function getRefund() {
  const response = await fetch('https://oijv97k0l6.execute-api.eu-central-1.amazonaws.com/test/refunds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await response.json();
  return json;
}

// 
const getRefundButton = document.getElementById('getRefund');
getRefundButton.onclick = async () => {
  const result = await getRefund();
  const list = document.getElementById('refundList');
  list.replaceChildren(); // removes all children (list items) from list, before adding freshly acquired ones
  result.Items.forEach((item) => createTableRow(item, list));
};

// --------------POST
async function postRefund(pName,pDebtor,pAmount,pDueDate) {
  const response = await fetch('https://oijv97k0l6.execute-api.eu-central-1.amazonaws.com/test/refunds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: pName,
      debtor: pDebtor,
      amount: pAmount,
      dueDate: pDueDate,
      // currency: 'euro' // optional field, you can pass any currenct name, but you don't have to. By default it's in euro.
    })
  
  });
  let result = {
    status: response.status,
    statusText: response.statusText
  }
  return result;
}

const form = document.getElementById('detail-form');
form.onsubmit = async function submit(event) {
  // Preventing page reload
  event.preventDefault();
  // Creating special object, so that we can get input values
  const formData = new FormData(form);
  // Getting input values by input names (NOT ids)
  const name = formData.get('name') || '';
  const debtor = formData.get('debtor') || '';
  const amount = formData.get('amount') || '';
  const dueDate = formData.get('dueDate') || '';

  let result = await postRefund(name,debtor,amount,dueDate);
  const resultText = document.getElementById("result");
  if (result.status === 200) {
    resultText.innerHTML = 'Refund created!'
  } else if (result.status >= 400) {
    resultText.innerHTML = result.statusText;
  }
}

// -----------------DELETE
async function deleteRefund(pId) {
  const response = await fetch('https://oijv97k0l6.execute-api.eu-central-1.amazonaws.com/test/refunds', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // 4 required fields
      id: pId,
    })
  });
  let result = {
    status: response.status,
    statusText: response.statusText
  }
  return result;
}

