/* eslint-disable no-use-before-define */
let queryParams = [];

let apiUrl = 'http://universities.hipolabs.com/search?';
const dataTable = $('#dataTable').DataTable({
  paging: true,
  dom: 'Bfrtip',
  buttons: [
    'excelHtml5',
    'csvHtml5',
    'pdfHtml5',
  ],
  initComplete() {
    $('.dt-buttons').hide();
  },
});

function showLoadingMessage() {
  $('#loading-message').show();
}

function hideLoadingMessage() {
  $('#loading-message').hide();
}

function fetchData(url) {
  showLoadingMessage();
  let slno = 1;
  $.ajax({
    url,
    method: 'GET',
    datatype: 'json',
    success(data) {
      hideLoadingMessage();
      if (data.length === 0) {
        dataTable.clear().draw();
        $('.dt-buttons').hide();
      } else {
        dataTable.clear().draw();
        data.forEach((item) => {
          dataTable.row.add([
            slno,
            item.name,
            item.alpha_two_code,
            item['state-province'],
            item.web_pages,
            item.domains,
            item.country,
          ]);
          slno += 1;
        });
        dataTable.draw();
        $('.dt-buttons').show();
      }
    },
  });
}


function seacrhQueries() {
  const searchName = $('#nameSearchBox').val();
  const searchCountry = $('#countrySearchBox').val();
  if (searchName) {
    queryParams.push(`name=${searchName}`);
  }

  if (searchCountry) {
    queryParams.push(`country=${searchCountry}`);
  }

  if (queryParams.length > 0) {
    const URL = apiUrl + queryParams.join('&');
    fetchData(URL);
  }
  fetchData(apiUrl);
}

$(document.forms).on('submit', (e) => {
  e.preventDefault();
  seacrhQueries();
  apiUrl = 'http://universities.hipolabs.com/search?';
  queryParams = [];
});