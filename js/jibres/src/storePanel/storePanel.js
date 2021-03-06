
function calcFooterValues(_table)
{
  if(!_table)
  {
    _table = $('.productList');
    if(_table.length < 1)
    {
      // return null;
    }
  }
  var calcDtCountRow        = 0;
  var calcDtSumCount        = 0;
  var calcDtSumPrice        = 0;
  var calcDtSumDiscount     = 0;
  var calcDtDiscountPercent = 0;
  var calcDtSumTotal        = 0;
  var factorType            = $('body').attr('data-page');
  // calc total of column
  _table.find('tbody tr').each(function(index)
  {
    // reset row index
    $(this).find('td.cellIndex').text(fitNumber(index + 1));


    // variables
    var tmpCount = $(this).find('.count').val();
    if(tmpCount)
    {
      tmpCount = parseFloat(tmpCount.toEnglish());
    }
    var tmpBuy = $(this).find('td.cellBuy input').val();
    if(tmpBuy)
    {
      tmpBuy = parseInt(tmpBuy.toEnglish());
    }
    var tmpPrice = $(this).find('td.cellPrice').attr('data-val');
    if(tmpPrice)
    {
      tmpPrice = parseInt(tmpPrice);
    }
    var tmpDiscount = $(this).find('.discount').val();
    if(tmpDiscount)
    {
      tmpDiscount = parseInt(tmpDiscount.toEnglish());
    }
    var tmpDiscountPercent = 0;
    if(factorType === 'buy')
    {
      tmpPrice = tmpBuy;
    }

    // check NaN values
    if(isNaN(tmpCount))
    {
      tmpCount = 0;
    }
    if(isNaN(tmpPrice))
    {
      tmpPrice = 0;
    }
    if(isNaN(tmpDiscount))
    {
      tmpDiscount = 0;
    }
    if(tmpPrice < tmpDiscount)
    {
      $(this).find('.discount').val('');
      tmpDiscount = 0;
    }

    var tmpPriceCol    = tmpCount * tmpPrice;
    var tmpDiscountCol = tmpCount * tmpDiscount;
    var tmpFinalCol    = tmpCount * (tmpPrice - tmpDiscount);

    // count of row
    calcDtCountRow    += 1;
    // sum of counts
    calcDtSumCount    += tmpCount;
    calcDtSumPrice    += tmpPriceCol;
    calcDtSumDiscount += tmpDiscountCol;
    calcDtSumTotal    += tmpFinalCol;

    // set discount percent
    tmpDiscountPercent = (tmpDiscount * 100 / tmpPrice).toFixed(2);
    if($.isNumeric(tmpDiscountPercent) && tmpDiscountPercent>0 )
    {
      // $(this).find('td.cellDiscount .addon').text(fitNumber(tmpDiscountPercent) + '%');
      $(this).find('td.cellDiscount input').attr('title', fitNumber(tmpDiscountPercent) + ' %');
    }
    else
    {
      $(this).find('td.cellDiscount input').attr('title', '00');
      // $(this).find('td.cellDiscount .addon').text('');
    }

    // set final price
    if(tmpFinalCol === 0 && !tmpPrice)
    {
      $(this).find('td.cellTotal').text('');
    }
    else
    {
      $(this).find('td.cellTotal').text(fitNumber(tmpFinalCol));
    }

    // some conditional formating
    if(tmpPrice < tmpDiscount)
    {
      $(this).find('.discount').addClass('negative');
      $(this).find('td.cellDiscount').addClass('negative');
      $(this).find('td.cellTotal').addClass('negative');
    }
    else
    {
      $(this).find('.discount').removeClass('negative');
      $(this).find('td.cellDiscount').removeClass('negative');
      $(this).find('td.cellTotal').removeClass('negative');
    }

  });

  // remove decimal value from total price
  // in future get option from store setting to round this value
  calcDtSumPrice    = Math.round(calcDtSumPrice);
  calcDtSumDiscount = Math.round(calcDtSumDiscount);
  calcDtSumTotal    = Math.round(calcDtSumTotal);

  // calc discount percent
  if(calcDtSumDiscount > 0)
  {
    calcDtDiscountPercent = (calcDtSumDiscount / calcDtSumPrice * 100).toFixed(2);
  }


  // show or hide priceBox
  if(calcDtCountRow > 0)
  {
    showWithFade($('.priceBox'));
  }
  else
  {
    setTimeout(function()
    {
      $('.priceBox').slideUp();
    }, 700);
  }

  $('.priceBox .final span').text(fitNumber(calcDtSumTotal)).attr('data-val', calcDtSumTotal);
  $(".priceBox .final").shrink(60);
  $('.priceBox .desc').text(wordifyTomans(calcDtSumTotal));
  $('.priceBox .item span').text(fitNumber(calcDtCountRow)).attr('data-val', calcDtCountRow);
  $('.priceBox .count span').text(fitNumber(calcDtSumCount)).attr('data-val', calcDtSumCount);
  $('.priceBox .sum span').text(fitNumber(calcDtSumPrice)).attr('data-val', calcDtSumPrice);
  $('.priceBox .discountPercent span').text(fitNumber(calcDtDiscountPercent)+ "%").attr('data-val', calcDtDiscountPercent);
  $('.priceBox .discount span').text(fitNumber(calcDtSumDiscount)).attr('data-val', calcDtSumDiscount);
  // update count of item in table
  _table.attr('data-item', calcDtCountRow);

  if(calcDtCountRow === calcDtSumCount || calcDtSumCount === 0)
  {
    $('.priceBox .count').slideUp();
  }
  else
  {
    $('.priceBox .count').slideDown();
  }
  if(calcDtSumDiscount === 0)
  {
    if($('.priceBox .discount').attr('data-wodiscount') === undefined)
    {
      $('.priceBox .discountPercent').slideUp('fast');
      $('.priceBox .discount').slideUp('fast');
    }
    else
    {
      $('.priceBox .discountPercent').slideDown();
      $('.priceBox .discount').slideDown();
    }
  }
  else
  {
    $('.priceBox .discountPercent').slideDown();
    $('.priceBox .discount').slideDown();
  }
  // show fadein box
  if(calcDtCountRow > 0)
  {
    showWithFade($('.NextBox'));
  }
  else
  {
   $('.NextBox').fadeOut('fast');
  }

    // $('.priceBox .final span').text('-');
}







function bindBtnOnFactor()
{
  $('body').on('barcode:detect', function(_e, _barcode)
  {
    if($('#searchInProducts').length < 1)
    {
      return null;
    }

    productBarcodeFinded(_barcode);
    // set focus to productSearch field
    $('#searchInProducts input[type="search"]').val('').trigger("focus");
    $('#searchInProducts #productSearch').select22('close');
  });

  $(document).on('focus', '#factorAdd table input', function()
  {
    var myTr = $(this).parents('tr');
    if(myTr.attr('data-selected') === undefined)
    {
      navigationFactorAddSetSelected(myTr);
    }
  });

  $(document).on('blur', '#factorAdd table input', function()
  {
    $(this).parents('tr').attr('data-selected', null);
  });


  $(document).on('focus', '#searchInProducts #select22-search__field', function()
  {
    calcFooterValues();
  });

  $(document).on('input', 'input.count', function()
  {
    calcFooterValues();
  });

  $(document).on('blur', 'input.count', function()
  {
    calcFooterValues();
  });

  $(document).on('input', 'input.buy', function()
  {
    calcFooterValues();
  });

  $(document).on('blur', 'input.buy', function()
  {
    calcFooterValues();
  });

  $(document).on('click', '.priceBox .discount', function()
  {
    shortkey_toggleDiscount();
  });

  $(document).on('input', 'input.discount', function()
  {
    calcFooterValues();
  });

  $(document).on('blur', 'input.discount', function()
  {
    calcFooterValues();
  });

  sendToPcPos();

  // add event to handle dropdown selected value
  $('body').on('dropdown:selected:datalist', function(_e, _selectedProduct)
  {
    if(_selectedProduct)
    {
      if(_selectedProduct.price)
      {
        addFindedProduct(_selectedProduct);
      }
    }
    else
    {
      logy('datalist is not exist');
    }

  });
}



function checkProductExist(_key, _value)
{
  // try to find this product with barcode
  switch(_key)
  {
    case 'barcode':
      var productInList = $('table tbody [data-barcode="'+ _value +'"]');
      // if not finded in barcode, search in barcode2
      if(!productInList.length)
      {
        productInList = $('table tbody [data-barcode2="'+ _value +'"]');
      }
      // if finded try to increase number of this product
      if(productInList.length)
      {
        return productInList;
      }
      break;

    case 'id':
      var productInList = $('table tbody [data-id='+ _value +']');
      // if finded try to increase number of this product
      if(productInList.length)
      {
        return productInList;
      }
      break;
  }
  // not finded
  return false;
}


/**
 * check conditions after finding barcode
 * @param  {[type]} _barcode [description]
 * @return {[type]}          [description]
 */
function productBarcodeFinded(_barcode)
{
  var existRecord = checkProductExist('barcode', _barcode);
  // for simple product we find that barcode
  // but for scale we dont find it and try to add new record
  if(existRecord)
  {
    updateRecord_ProductList(existRecord, 'count');
  }
  else
  {
    searchForProduct('barcode', _barcode);
  }
}


/**
 * try to search on server
 * @param  {[type]} _key   [description]
 * @param  {[type]} _value [description]
 * @return {[type]}        [description]
 */
function searchForProduct(_key, _value)
{
  if(!urlStore())
  {
    return null;
  }
  // if is not barcode and not finde02902749
  // d, search and if find, add or update
  var pSearchURL = urlStore() + "a/products/api?json=true&" + _key + "=" + _value;
  $.get(pSearchURL, function(_productData)
  {
    var myMsg;
    pData = clearJson(_productData);
    if(_productData && _productData.result && _productData.result.message)
    {
      myMsg = _productData.result.message;
    }

    // if have error show error message
    if(myMsg)
    {
      addFindedProduct(null, myMsg, _value);
    }
    else
    {
      addFindedProduct(pData);
    }
  });
}





/**
 * final function to add record of product
 * @param {[type]} _product [description]
 */
function addFindedProduct(_product, _msg, _searchedValue)
{
  if(_product)
  {
    if(_product.id)
    {
      var existRecord = checkProductExist('id', _product.id);
      if(existRecord)
      {
        if(_product.scale)
        {
          var duplicateMsg = _product.scaleDuplicate;
          if(!duplicateMsg)
          {
            duplicateMsg = 'Duplicate';
          }

          say(
          {
            type: 'warning',
            text: duplicateMsg,
          });
        }
        else
        {
          updateRecord_ProductList(existRecord, 'count', _product.quantity);
        }
      }
      else
      {
        addNewRecord_ProductList(null, _product);
      }
    }
    else
    {
      say(
      {
        type: 'error',
        text: 'Error in products!',
      });
    }
  }
  else
  {
    if(_msg)
    {
      notif('warn', _msg, null, null, {position:'center', displayMode: 1});
    }
    else
    {
      say(
      {
        type: 'error',
        text: 'Product is not detected!',
      });
    }

    beep('ProductNotExist.mp4');
    // show custom message if product not fount
    // if(productNotExistList)
    // productNotExistList.[_searchedValue] = 1;
  }
}



/**
 * update record and increase number of exist record
 * @param  {[type]} _row   [description]
 * @param  {[type]} _key   [description]
 * @param  {[type]} _value [description]
 * @return {[type]}        [description]
 */
function updateRecord_ProductList(_row, _key, _value)
{
  switch (_key)
  {
    case 'count':
      var currentCounter = _row.find('.count');
      // console.log(_value);
      if(!_value)
      {
        _value = 1;
      }
      currentCounter.val(parseFloat(currentCounter.val()) + _value);
      break;
  }

  $('#productSearch').val('');
  calcFooterValues();
}


/**
 * add record to table of products
 * @param {[type]} _table   [description]
 * @param {[type]} _product [description]
 * @param {[type]} _append  [description]
 */
function addNewRecord_ProductList(_table, _product, _append)
{
  if(!_table)
  {
    _table = $('.productList');
    if(_table.length < 1)
    {
      return null;
    }
  }

  var factorType = $('body').attr('data-page');

  var trEmpty   = '<tr>';
  trEmpty       += '<td class="cellIndex"></td>';
  trEmpty       += '<td class="cellTitle"></td>';
  trEmpty       += '<td class="cellCount"></td>';
  if(factorType === 'buy')
  {
    trEmpty       += '<td class="cellBuy"></td>';
  }
  else
  {
    trEmpty       += '<td class="cellPrice"></td>';
    trEmpty       += '<td class="cellDiscount"></td>';
  }
  trEmpty       += '<td class="cellTotal"></td>';
  trEmpty       += '</tr>';
  var newRecord = $(trEmpty);
  var cuRow     = _table.find('tr').length;
  // set row number
  newRecord.find('td.cellIndex').text(fitNumber(cuRow));
  if(_product)
  {
    var myQuantity = _product.quantity;
    if(!myQuantity)
    {
      myQuantity = 1;
    }
    var htmlPName     = _product.title + '<input type="hidden" name="products[]" class="hidden" value="' + _product.id + '">';
    var htmlPCount    = '<input class="input count" type="number" name="count[]" autocomplete="off" min="0" max="1000000000" step="any" placeholder="-" value="'+ myQuantity +'">';
    if(factorType === 'buy')
    {
      htmlPCount = '<input class="input count" type="number" name="count[]" autocomplete="off" min="0" max="1000000000" step="any" placeholder="-" >';
    }

    var htmlPBuy      = '<input class="input buy" type="number" name="buy[]" autocomplete="off" min="0" max="1000000000" value="' + _product.buyprice +'">';
    var htmlPDiscount = '<div class="input discountCn">';
    htmlPDiscount    += '<input class="discount" type="number" name="discount[]" autocomplete="off" title="%" min="0" max="1000000000"';
    if(_product.discount)
    {
      var removeDiscount = !(_table.attr('data-woDiscount') !== undefined);
      if(removeDiscount)
      {
        htmlPDiscount += ' value="' + _product.discount + '"';
      }
      // set data-discount on all condition
      htmlPDiscount += ' data-discount="' + _product.discount + '"';
    }
    htmlPDiscount    += '>';
    // htmlPDiscount    += '<span class="addon small">0%</span>'+ '</div>';

    // fill with product details
    // logy(_product);
    newRecord.attr('data-id', _product.id);
    newRecord.attr('data-barcode', _product.barcode);
    newRecord.attr('data-barcode2', _product.barcode2);
    newRecord.find('td.cellTitle').html(htmlPName);
    newRecord.find('td.cellCount').html(htmlPCount);
    if(factorType === 'buy')
    {
      newRecord.find('td.cellBuy').html(htmlPBuy);
    }
    else
    {
      newRecord.find('td.cellPrice').text(fitNumber(_product.price)).attr('data-val', _product.price);
      newRecord.find('td.cellDiscount').html(htmlPDiscount);
    }

    newRecord.find('td.cellTotal').text(fitNumber(_product.finalprice)).attr('data-val', _product.finalprice);
  }
  else
  {
    // empty all inputs
    newRecord.find("input").val('');
    newRecord.find('td.cellPrice').text('');
    newRecord.find('td.cellTotal').text('');
  }

  if(_append)
  {
    // appent to end of table
    newRecord.appendTo('.productList tbody');
  }
  else
  {
    // prepent to start of table
    newRecord.prependTo('.productList tbody');
  }

  calcFooterValues(_table);
}


function qtyFactorTableItems()
{
  NoRecordExist = $('#factorAdd table tbody tr').length;
  return NoRecordExist;
}


function showWithFade(_el)
{
  if(_el.hasClass('hide'))
  {
    _el.removeClass('hide').hide();
  }
  _el.fadeIn();
}


function navigateonFactorAddInputs(_type, _e)
{
  if(!check_factor())
  {
    return false;
  }
  // check focus
  var $focus = $(":focus");

  if(($focus.parents('.productList').length !== 1))
  {
    // outside of table
    return false;
  }

  var currentTd  = $focus.parents('td');
  var currentTr  = $focus.parents('tr');

  // var currentRow = $('#factorAdd .productList tbody').index(currentTr);
  var currentRow = currentTr.index();
  var maxRow     = $('#factorAdd .productList tbody tr').length -1;
  var nextRow    = currentRow;
  var nextField  = 'count';
  // check input group
  if($focus.is('.count'))
  {
    nextField = 'count';
  }
  else if($focus.is('.discount'))
  {
    nextField = 'discount';
  }

  switch(_type)
  {
    case 'up':
      nextRow -= 1;
      _e.preventDefault();
      break;

    case 'down':
      nextRow += 1;
      _e.preventDefault();
      break;

    case 'left':
    case 'right':

      if(nextField == 'count')
      {
        nextField = 'discount';
      }
      else if(nextField == 'discount')
      {
        nextField = 'count';
      }
      break;
  }

  if(nextRow < 0)
  {
    // end
    nextRow = maxRow;
  }
  else if(nextRow > maxRow)
  {
    nextRow = 0;
  }

  var nextRowEl      = $('#factorAdd .productList tbody tr:eq('+ nextRow +')');
  var nextRowInputEl = nextRowEl.find('input.'+ nextField);
  navigationFactorAddSetSelected(nextRowEl);

  setTimeout(function()
  {
    nextRowInputEl.select();
  }, 10);
}


function navigationFactorAddSetSelected(_tr, _focus)
{
  if(!_tr || _tr.length === 0)
  {
    _tr = $('#factorAdd .productList tbody tr:first-child');
  }

  // remove other selecred
  $('#factorAdd .productList tbody tr').attr('data-selected', null);
  // add selected to specefic one
  _tr.attr('data-selected', '');
  if(_focus === true)
  {
    _tr.find('.input.count').select();
  }
}


function shortkey_toggleDiscount(_status)
{
  var priceDiscountEl = $('.priceBox .discount');
  var removeDiscount = !(priceDiscountEl.attr('data-woDiscount') !== undefined);
  if(removeDiscount)
  {
    priceDiscountEl.attr('data-woDiscount', '');
    $('.productList th.headDiscount').addClass('negative').attr('data-woDiscount', '');
  }
  else
  {
    priceDiscountEl.attr('data-woDiscount', null);
    $('.productList th.headDiscount').removeClass('negative').attr('data-woDiscount', null);
  }

  $('.productList input.discount').each(function()
  {
    if(removeDiscount)
    {
      var currentVal = parseInt($(this).val());
      if(!$.isNumeric(currentVal))
      {
        currentVal = null;
      }
      $(this).attr('data-discount', currentVal);
      $(this).val(0);
    }
    else
    {
      var savedDiscount = $(this).attr('data-discount');
      if($.isNumeric(savedDiscount))
      {
        $(this).val(savedDiscount);
      }
    }
  });
  // recalc values
  calcFooterValues();
}



function shortkey_print(_el)
{
  if($("#sale_clicked_btn").length)
  {
    $("#sale_clicked_btn").attr('value', 'save_print');
    $("#sale_clicked_btn").parents('form').submit();
  }
  logy('printing...');
}


function prevFactor(_type, _all)
{
  if(_type === undefined)
  {
    _type = 'sale';
  }
  if(!urlStore())
  {
    return null;
  }
  var lastFactorUrl = urlStore() + 'a/' + _type + '/prev';
  // add id if exist
  if(check_factor() && urlParam('id'))
  {
    lastFactorUrl += '/'+ urlParam('id');
  }
  // add lang if exist
  if($('html').attr('lang') !== undefined)
  {
    lastFactorUrl = $('html').attr('lang')+ lastFactorUrl;
  }
  if(_all)
  {
    lastFactorUrl += '?in=all';
  }
  Navigate({ url: lastFactorUrl });
}



function sendToPcPos()
{
  $(document).on('click', '.pcPos', function()
  {
    var myLink    = $(this).attr('data-link');
    var lastPrice = $('.priceBox .final span').attr('data-val');
    lastPrice += "0";

    if(lastPrice > 0)
    {
      // replace last price
      myLink = myLink.replace("$", lastPrice);
      console.log('send price to pcpos ' + lastPrice);
        $.ajax(
        {
            type: "GET",
            url: myLink,
            dataType: 'jsonp',
            success: function (_data)
            {
              notif('info', 'مبلغ ' + lastPrice + ' به پی‌سی‌پوز ارسال شد.');
              console.log('success calling pcpos');
              console.log(_data);
            },
            error: function (_e)
            {
              notif('warning', 'اتصال اولیه به پی‌سی‌پوز '+ lastPrice);
              console.log('error on pcpos');
              console.log(JSON.stringify(_e));
            }
        });
    }
    else
    {
      notif('error', 'مبلغ برای ارسال به پی‌سی‌پوز معتبر نیست');
      console.log('Price is not valid to send to pcpos ' + lastPrice);
    }
  });
}




