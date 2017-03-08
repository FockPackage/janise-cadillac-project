/* eslint-disable */
function showAccessoriesList() {
  $.get('/api/v2/sales/getAccessories')
    .then((res) => {
      console.log(res);
      let html = '';
      res.rows.forEach((item) => {
        const btn = `<td><div class="form-group"><button data-id=${item.id} class="button delete">删除</button></div></td>`;
        const tr = `<tr><td>${item.id}</td><td>${item.fitCode}</td><td>${item.fitName}</td><td>${item.fitType ? item.fitType.meaning : ''}</td><td style="max-width: 180px">${item.suitableForCar}</td><td>${item.isOfficial}</td><td>${item.description}</td><td>${item.costPrice}</td>${btn}</tr>`;
        html += tr;
      });
      console.log(html);
      $('#accessoriesList').html(html);
      $('.delete').on('click', (e) => {
        // console.log(e.target.getAttribute('data-id'));
        const id = e.target.getAttribute('data-id');
        console.log('id:', id);
        // $.delete(`/end/deleteAccessories/${id}`);
        $.ajax({
          url: `/end/deleteAccessories/${id}`,
          type: 'DELETE',
          success: () => {
            // if (res.code === 0) {
            alert('删除成功');
            showAccessoriesList();
            // }
          },
          error: (err) => {
            alert(`删除失败: ${err.message}`);
          },
        });
      });
    })
    .catch((err) => {
      alert(`获取失败： ${err.message}`);
      console.log(err);
    });
}


$(() => {
  showAccessoriesList();
  $.get('/api/v2/classify/getFitType')
    .then((res) => {
      console.log(res);
      let opt = '';
      res.rows.forEach((item) => {
        opt = `${opt}<option value="${item.id}">${item.meaning}</option>`;
      });
      $('#fitType').html(opt);
      $('#updatFitType').html(opt);
    });
  $('#submit').on('click', () => {
    const fitCode = $('#fitCode').val();
    const fitName = $('#fitName').val();
    const fitTypeId = $('#fitType').val();
    const suitableForCar = $('#suitableForCar').val();
    const isOfficial = $('#isOfficial').val();
    const description = $('#description').val();
    const costPrice = $('#costPrice').val();
    const obj = {
      fitCode,
      fitName,
      fitTypeId,
      suitableForCar,
      isOfficial,
      description,
      costPrice,
    };
    $.post('/end/Accessories', obj)
      .then((res) => {
        console.log(obj);
        console.log(res);
        alert('提交成功!');
        showAccessoriesList();
      })
      .catch((err) => {
        console.log(err);
        alert(`提交失败: ${err.message}`);
      });
  });

  $('#update').on('click', () => {
    const id = $('#updatId').val();
    const fitCode = $('#updatFitCode').val();
    const fitName = $('#updatFitName').val();
    const fitTypeId = $('#updatFitType').val();
    const suitableForCar = $('#updatSuitableForCar').val();
    const isOfficial = $('#updatIsOfficial').val();
    const description = $('#updatDescription').val();
    const costPrice = $('#updatCostPrice').val();
    const obj = {
      fitCode,
      fitName,
      fitTypeId,
      suitableForCar,
      isOfficial,
      description,
      costPrice,
    };

    $.ajax({
      url: `/end/updateAccessories/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: obj,
      success: (res) => {
        alert('更新成功');
        showAccessoriesList();
      },
      error: (err) => {
        alert('更新失败');
      }
    })


    // $.post('/end/Accessories', obj)
    //   .then((res) => {
    //     console.log(obj);
    //     console.log(res);
    //     alert('提交成功!');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert(`提交失败: ${err.message}`);
    //   });
  })

});
