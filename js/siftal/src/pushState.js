// on start
function pushStateSiftal(_direct)
{
  // run modal
  modalOpenClose();
  runDataResponse();
  runInputFileFunc();
  responsiveSidebar();
  // setLanguageURL(_direct);
  runSortable();
  // run counter up on each page we have counter
  runCounterUp();
  // run notif from html
  runHtmlNotif();
  // detect id and try to scroll to it
  scrollSmoothDetector(_direct);
  // run watchScroll func to watch all elements
  watchScroll();
  // run form tools
  formToolsRunner();
  initTagDetector();
  bindUploader();
  dropdownRunner();
  // run select22
  selectRunner();
  // run numeral fn
  cleaveRunner();
  // run slick slider
  slickRunner();
  // check navigate is done or not
  navigateChecker();
  // check autoPrint detection
  autoPrint();
  // run runner
  dataRunner();
  // run kerkere
  kerkereRunner();
  // run dataCopy
  dataCopy();
  // add typed
  typeTitles();
  // Run draw barcode lib
  JsBarcodeRunner();

  if($('body').attr('data-in') === 'enter')
  {
    // run on enter
    handleEnterEvents();
  }

  if($('body').attr('data-in') === 'pay')
  {
    // run on enter
    handlePayEvents();
  }

  if($('body').attr('data-in') === 'a')
  {
    calcFooterValues();
    calcProductMargin();
  }

  callFunc('pushState', _direct);
  callFunc('pushStateFinal', _direct);
  callFunc('chartDrawer', _direct);
  callFunc('pushStateGA', _direct);
}


// run for the first time
$(document).ready(function()
{
  pushStateSiftal(true);

  // call some static function without need to run with pushState
  inputChecker();
  // check we are in iframe of not!
  insideIframe();
  // check requirements of form and highlight them
  inputRequirement();
  // do something before unload page
  catchBeforeUnload();
  // openable table
  tbl1Openable();
  // remove noscript tag
  noscriptRemover();
  // run cloner
  cloner();
  pingiRunner();
  // try to register service worker
  registerServiceWorker();

  if($('body').attr('data-panel') !== undefined)
  {
    // bind userprofile to show detail
    showUserProfile();
    // check for new smile
    checkSmile(true);
  }

  // run once on ready
  bindBtnOnFactor();
  // bind shortkey on each page
  callFunc('bindShortkey')
});



function beforePushStateSiftal()
{
  callFunc('removeAmcharts4');

}
