$(function () {
  const url = 'http://localhost:3001'
  Promise.all([
    $.get(`${url}/api/common/VqValueSet`),
    $.get(`${url}/api/common/VqValue`)
  ]).then(res => {

    let vqValueSets = res[0].rows;
    let vqValues = res[1].rows;

    let div = '';
    const select = document.getElementById('carType');
    vqValueSets.forEach((item, index) => {
      div = `${div}<option value="${index}">${item.valueSetName}</option>`;
    })
    select.innerHTML = div;

    let div2 = '';
    const seletc2 = document.getElementById('items');
    vqValues.forEach((item, index) => {
      div2 = `${div2}<option value="${index}">${item.meaning}</option>`;
    })
    seletc2.innerHTML = div2;

    const node = [];
    const nodeValue = [];
    vqValues.forEach((item, index) => {
      const obj = item;
      obj.option = `<option data-valueID="${item.valueID}" value="${item.valueID}">${item.meaning}</option>`
      nodeValue.push(item)
    })

    vqValueSets.forEach((item, index) => {
      node.push({
        code: item.code,
        setDesc: item.setDesc,
        valueSetID: item.valueSetID,
        valueSetName: item.valueSetName
      });
    })

    node.forEach((item, index) => {
      node[index].list = [];
      nodeValue.forEach((vqValue, i) => {
        if (vqValue.valueSetID == item.valueSetID) {
          node[index].list.push({
            description: vqValue.description,
            meaning: vqValue.meaning,
            value: vqValue.value,
            valueID: vqValue.valueID,
            valueSetID: vqValue.valueSetID,
            option: vqValue.option,
          })
        }
      });
      node[index].options = '';
      node[index].list.forEach(it => {
        node[index].options = `${node[index].options}${it.option}`;
      });
      node[index].select = `<select name="valueSet_${item.code}" id="valueSet_${item.code}" multiple="multiple" size="10">${node[index].options}</select>`;

      node[index].tbh = `<th>${node[index].select}</th>`;

      node[index].thh = `<th>${item.valueSetName}</th>`;
    })

    let headTr = '';
    let bodyTr = '';
    node.forEach(item => {
      headTr = headTr + item.thh;
      bodyTr = bodyTr + item.tbh;
    })

    const table_head_tr = document.getElementById('table-head-tr');
    const table_body_tr = document.getElementById('table-body-tr');
    // console.log(headTr);
    table_head_tr.innerHTML = headTr;
    table_body_tr.innerHTML = bodyTr;
    // console.log(node);

    // 提交
    // const btn = document.getElementById('submint');
    $('#submit').on('click', () => {
      // 获取各个select的值
      // 车型
      const valueSet_0 = $('#valueSet_0');
      // 年份
      const valueSet_1 = $('#valueSet_1');
      // 排量
      const valueSet_2 = $('#valueSet_2');
      // 配置
      const valueSet_3 = $('#valueSet_3');
      // 车身颜色
      const valueSet_4 = $('#valueSet_4');
      // 内饰颜色
      const valueSet_5 = $('#valueSet_5');
      // 轮轴
      const valueSet_6 = $('#valueSet_6');
      // 车系
      // const valueSet_7 = $('#valueSet_7');
      // 配件
      const valueSet_8 = $('#valueSet_8');
      // 价格
      const cost = $('#cost');

      console.log(valueSet_0.val());
      console.log(valueSet_1.val());
      console.log(valueSet_2.val());
      console.log(valueSet_3.val());
      console.log(valueSet_4.val());
      console.log(valueSet_5.val());
      console.log(valueSet_6.val());
      console.log(cost.val());

      const arr = [valueSet_0.val(), valueSet_1.val(), valueSet_2.val(), valueSet_3.val(), valueSet_4.val(), valueSet_5.val(), valueSet_6.val()];
      console.log('arr:', arr);

      var allArrays = [['a', 'b'], ['c'], ['d', 'e', 'f']]
      function allPossibleCases(arr) {
        // cosnt list = [];
        if (arr.length == 1) {
          return [arr[0]];
        } else {
          const list = [];
          arr.forEach(items => {
            if (Array.isArray(items) && items.length > 1) {

            }
          })

        }
      }

      // console.log('tag', allPoss);
      // function allPossibleCases(arr) {
      //   if (arr.length == 1) {
      //     return arr[0];
      //   } else {
      //     var result = [];
      //     var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
      //     for (var i = 0; i < allCasesOfRest.length; i++) {
      //       for (var j = 0; j < arr[0].length; j++) {
      //         result.push(`${arr[0][j]} - ${allCasesOfRest[i]}`);
      //       }
      //     }
      //     return result;
      //   }
      // }

      // const a = allPossibleCases(arr);
      // console.log('a: ', a);
    })

  })
  // .catch(err => {
  //   console.log(err);
  // })
})
