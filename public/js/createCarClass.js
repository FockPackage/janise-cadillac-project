/* eslint-disable */

/**
 * 组合二维数组所有可能
 * @param {Array} listList 二维数组
 * @returns {Array} 所有可能
 */
function combine(listList) {
  let resultList = listList.shift().map((item) => {
    return [item];
  });
  listList.forEach((list) => {
    let partialLen = resultList.length;
    resultList.length *= list.length;
    for (let h = list.length - 1; h >= 0; h--) {
      let item = list[h];
      let start = h * partialLen;
      let end = start + partialLen;
      for (let i = start; i < end; i++) {
        if (i < partialLen) {
          resultList[i].push(item);
        } else {
          resultList[i] = resultList[i % partialLen].map((temp) => {
            return temp;
          });
          resultList[i].push(item);
        }
      }
    }
  });
  const arr = [];
  resultList.forEach((list) => {
    // console.log(list.toString());
    const obj = {
      carTypeId: list[0],
      carYearId: list[1],
      carDisplaceId: list[2],
      carConfigId: list[3],
      carInsideColorId: list[4],
      carOutsideColorId: list[5],
      carHubId: list[6],
      officialGuidePrice: list[7],
    };
    arr.push(obj);
  });
  return arr;
}

/**
 * 过滤
 *
 * @param {any} list
 * @param {any} opt
 * @returns
 */
function filterList(list, opt) {
  let arr = list;
  if (opt) {
    const keys = Object.keys(opt);
    // const objs = [];
    // keys.forEach((item, index) => {
    //   if (opt[item]) {
    //     objs.push(item);
    //   }
    // });
    const objs = keys.filter((key) => {
      return opt[key] !== '';
    });
    objs.forEach((key) => {
      let tempList = [];
      tempList = arr.filter((item) => {
        return item[key] === opt[key];
      });
      arr = tempList;
    });
  }
  return arr;
}

/**
 * 显示列表
 *
 * @param {any} list
 * @param {any} opts
 */
function showCarRelationList(opts) {
  $.get('/api/v2/sales/getCarRelation')
    .then((res) => {
      //     console.log(res);
      let html = '';
      const arr = filterList(res.rows, opts);
      arr.forEach((item) => {
        const tdOfId = `<td>${item.id}</td>`;
        const tdOfCarType = `<td>${item.carType.meaning}</td>`;
        const tdOfCarYear = `<td>${item.carYear.meaning}</td>`;
        const tdOfCarDisplace = `<td>${item.carDisplace.meaning}</td>`;
        const tdOfCarConfig = `<td>${item.carConfig.meaning}</td>`;
        const tdOfCarOutsideColor = `<td>${item.carOutsideColor.meaning}</td>`;
        const tdOfCarInsideColor = `<td>${item.carInsideColor.meaning}</td>`;
        const tdOfCarHub = `<td>${item.carHub.meaning}</td>`;
        const tdOfOfficialGuidePrice = `<td>${item.officialGuidePrice}</td>`;
        const tdcarSummary3 = `<td>${item.carSummary3 || ""}</td>`;
        const td = `<td style="min-width:80px"><div class="form-group"><button class="form-control delete" type="button" data-id=${item.id}>删除</button></div></td>`;
        html += '<tr>' + tdOfId + tdOfCarType + tdOfCarYear + tdOfCarDisplace + tdOfCarConfig + tdOfCarOutsideColor + tdOfCarInsideColor + tdOfCarHub + tdOfOfficialGuidePrice + tdcarSummary3 + td + '<tr>';
      });
      $('#carRelationList').html(html);
      $('.delete').on('click', (e) => {
        const id = e.target.getAttribute('data-id');
        $.ajax({
          url: `/end/deleteCarRelation/${id}`,
          type: 'DELETE',
          success: () => {
            alert('删除成功');
            showCarRelationList(opts);
            // $.get('/api/v2/sales/getCarRelation')
            //   .then((res) => {
            //     console.log(res);
            //     const rows = res.rows;
            //     showCarRelationList(rows, opts);
            //   });
          },
          error: (err) => {
            alert(`删除失败: ${err.message}`);
          },
        });
      });
    });
  // .catch((err) => {
  //   alert(`获取错误: ${err.message}`);
  // });
}


$(() => {
  Promise.all([
    $.get('/api/v2/classify/getCarType'),
    $.get('/api/v2/classify/getYear'),
    $.get('/api/v2/classify/getDisplace'),
    $.get('/api/v2/classify/getConfig'),
    $.get('/api/v2/classify/getInsideColor'),
    $.get('/api/v2/classify/getOutsideColor'),
    $.get('/api/v2/classify/getHub'),
    // $.get('/api/v2/classify/getCarSalesClass'),
  ]).then((result) => {
    const carType = result[0].rows;
    const year = result[1].rows;
    const displace = result[2].rows;
    const carConfig = result[3].rows;
    const insideColor = result[4].rows;
    const outsideColor = result[5].rows;
    const hub = result[6].rows;

    let list = [];

    showCarRelationList();
    $('#fiterS').on('click', () => {
      const opt = {
        carTypeId: $('#carTypeS').val(),
        carYearId: $('#yearS').val(),
        carDisplaceId: $('#displaceS').val(),
        carConfigId: $('#carConfigS').val(),
        carOutsideColorId: $('#outsideColorS').val(),
      };
      showCarRelationList(opt);

      // $.get('/api/v2/sales/getCarRelation')
      //   .then((res) => {
      //   })

      // showCarRelationList(list, opt);
    });
    // $.get('/api/v2/sales/getCarRelation')
    //   .then((res) => {
    //     console.log(res);
    //     list = res.rows;

    //   });


    console.log({
      carType,
      year,
      displace,
      carConfig,
      insideColor,
      outsideColor,
      hub,
    });
    const emptyOption = '<option value="">无</option>';
    let typeStr = '';
    carType.forEach((item) => {
      typeStr = `${typeStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#carType').html(typeStr);
    $('#carTypeS').html(emptyOption + typeStr);
    $('#carTypeUp').html(typeStr);

    let yearStr = '';
    year.forEach((item) => {
      yearStr = `${yearStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#year').html(yearStr);
    $('#yearS').html(emptyOption + yearStr);
    $('#yearUp').html(yearStr);

    let displaceStr = '';
    displace.forEach((item) => {
      displaceStr = `${displaceStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#displace').html(displaceStr);
    $('#displaceS').html(emptyOption + displaceStr);
    // $('#displaceUp').html(displaceStr);

    let carConfigStr = '';
    carConfig.forEach((item) => {
      carConfigStr = `${carConfigStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#carConfig').html(carConfigStr);
    $('#carConfigS').html(emptyOption + carConfigStr);
    $('#carConfigUp').html(carConfigStr);

    let insideColorStr = '';
    insideColor.forEach((item) => {
      insideColorStr = `${insideColorStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#insideColor').html(emptyOption + insideColorStr);

    let outsideColorStr = '';
    outsideColor.forEach((item) => {
      outsideColorStr = `${outsideColorStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#outsideColor').html(outsideColorStr);
    $('#outsideColorS').html(emptyOption + outsideColorStr);

    let hubStr = '';
    hub.forEach((item) => {
      hubStr = `${hubStr}<option value=${item.id} data-id="${item.id}">${item.meaning}</option>`;
    });
    $('#hub').html(hubStr);

    $('#submit').on('click', () => {
      const carTypeIds = $('#carType').val();
      const carYearIds = $('#year').val();
      const carDisplaceIds = $('#displace').val();
      const carConfigIds = $('#carConfig').val();
      const carInsideColorIds = $('#insideColor').val();
      const carOutsideColorIds = $('#outsideColor').val();
      const carHubIds = $('#hub').val();
      const officialGuidePrice = $('#price').val();
      const list = [carTypeIds, carYearIds, carDisplaceIds, carConfigIds, carInsideColorIds, carOutsideColorIds, carHubIds, [officialGuidePrice]];
      const arr = combine(list);
      console.log(arr);
      $.ajax({
        url: '/end/carClass',
        type: 'POST',
        dataType: 'json',
        data: {
          items: arr,
        },
        success: (res) => {
          console.log(res);
          alert('创建成功');
        },
        error: (err) => {
          console.log(err);
          alert(`创建失败: ${err.message}`);
        }
      })
      // $.post('/end/carClass', {
      //   items: arr,
      // }).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
    });



    // 更新
    $('#update').on('click', () => {
      const carTypeId = $('#carTypeUp').val();
      const carYearId = $('#yearUp').val();
      const carConfigId = $('#carConfigUp').val();
      const carSummary3 = $('#carSummary3Up').val();
      const obj = {
        carTypeId,
        carYearId,
        carConfigId,
        carSummary3,
      };
      console.log(obj);
      $.ajax({
        url: '/end/updateCarRelaction',
        type: 'PUT',
        dataType: 'json',
        data: obj,
        success: (res) => {
          alert(res);
        },
        error: (err) => {
          alert ('失败');
        }
      })
    })
  });
});


