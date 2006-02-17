/* ****************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2005 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Kent Olsson (kols)
       <kent dot olsson at chello dot se>

**************************************************************************** */

/* ****************************************************************************

#package(splashscreen)

**************************************************************************** */

function QxSplashScreen(vComponent, vShowProgressBar)
{
  QxPopup.call(this);

//  this.setWidth(QxConst.CORE_AUTO);
//  this.setHeight(QxConst.CORE_AUTO);

  this.setBackgroundColor("threedface");
  this.setColor("windowtext");
  this.setBorder(QxBorderObject.presets.outset);
  this.setPadding(1);

//  if (this._initialLayoutDone && this.getVisibility() && this._isDisplayed)
//  {
//this.error("Make modal!!!");
//    this.getTopLevelWidget().block(this); //Make modal
//  };

  // ***********************************************************************
  //   LAYOUT
  // ***********************************************************************
  var l = this._layout = new QxVerticalBoxLayout();

//  l.setWidth(null);
//  l.setHeight(null);
//  l.setEdge(0);
  this.add(l);


  // ***********************************************************************
  //   Components
  // ***********************************************************************
  this._component = vComponent;
  vComponent.setFocused(false);

  l.add(vComponent);

  if(QxUtil.isValidBoolean(vShowProgressBar)) {
    this.setShowProgressBar(vShowProgressBar);
  };

  // ***********************************************************************
  //   EVENTS
  // ***********************************************************************
  vComponent.addEventListener(QxConst.EVENT_TYPE_MOUSEDOWN, this._onwindowmousedown, this);
  this.addEventListener(QxConst.EVENT_TYPE_KEYDOWN, this._onkeydown, this);
};

QxSplashScreen.extend(QxPopup, "QxSplashScreen");

QxSplashScreen.MIN_VALUE = 1;
QxSplashScreen.MAX_VALUE = 100;

/*
------------------------------------------------------------------------------------
  PROPERTIES
------------------------------------------------------------------------------------
*/

/*!
  Should the user have the ability to close the splashscreen by clicking on it or Escape.
*/
QxSplashScreen.addProperty({ name : "allowClose", type : QxConst.TYPEOF_BOOLEAN, defaultValue : true });

/*!
  Should the user have a status bar shown.
*/
QxSplashScreen.addProperty({ name : "showProgressBar", type : QxConst.TYPEOF_BOOLEAN, defaultValue : false });

/*!
  Time to show splash screen.
*/
QxSplashScreen.addProperty({ name : "showTime", type : QxConst.TYPEOF_NUMBER, defaultValue : 0 });

/*!
  Center the splash screen on open.
*/
QxSplashScreen.addProperty({ name : "centered", type : QxConst.TYPEOF_BOOLEAN, defaultValue : true });


/*
------------------------------------------------------------------------------------
  MODIFIERS
------------------------------------------------------------------------------------
*/

proto._modifyShowProgressBar = function(propValue, propOldValue, propData)
{
  if (propValue)
  {
    var progressPB = this._progressBar = new QxProgressBar(QxConst.DIRECTION_RIGHT, QxSplashScreen.MIN_VALUE, QxSplashScreen.MAX_VALUE);
    progressPB.setHeight(20);
    this._layout.addAtEnd(progressPB);
  }
  else
  {
    this._layout.remove(this._progressBar);
  };

  return true;
};

proto._modifyShowTime = function(propValue, propOldValue, propData)
{
  if (propValue)
  {
    this._timer = new QxTimer(this.getShowTime()/QxSplashScreen.MAX_VALUE);
    this._timer.addEventListener(QxConst.EVENT_TYPE_INTERVAL, this._oninterval, this);
  }
  else
  {
    this._timer.stop();
    this._timer.removeEventListener(QxConst.EVENT_TYPE_INTERVAL, this._oninterval, this);
    this._timer.dispose();
    this._timer = null;
  };

  return true;
};

/*
------------------------------------------------------------------------------------
  EVENTS
------------------------------------------------------------------------------------
*/

proto._oninterval = function(e)
{
  if(this.getShowProgressBar() && this._progressBar.getValue() < QxSplashScreen.MAX_VALUE)
  {
    this._progressBar.setValue(this._progressBar.getValue() + 1);
  }
  else
  {
    this._timer.stop();
    this.close();
  };
};

proto._onwindowmousedown = function(e)
{
  if(this.getAllowClose()) {
    this.close();
  };
};

proto._onkeydown = function(e) {
  if(e.getKeyCode() == QxKeyEvent.keys.esc)
  {
    this.close();
  };
};

/*
------------------------------------------------------------------------------------
  UTILITIES
------------------------------------------------------------------------------------
*/

proto.open = function()
{
  if (this.getCentered()) {
    QxUtil.centerToBrowser(this);
  };

  this.show();

  if(this.getShowTime())
  {
    this._timer.start();
  };
};

proto.close = function() {
  this.hide();
};

proto.setProgressBarValue = function(vValue)
{
  if(this.getShowProgressBar() && !this.getShowTime())
  {
    this._progressBar.setValue(vValue);
  }
  else
  {
    this.error("Can not manually increase the progress bar or a timer controlled splash screen.");
  };
};

/*
------------------------------------------------------------------------------------
  DISPOSER
------------------------------------------------------------------------------------
*/

proto.dispose = function()
{
  if (this.getDisposed()) {
    return true;
  };

  if (this._layout)
  {
    this._layout.dispose();
    this._layout = null;
  };

  if (this._component)
  {
    this._component.dispose();
    this._component = null;
  };

  if (this._progressBar)
  {
    this._progressBar.dispose();
    this._progressBar = null;
  };

  if (this._timer)
  {
    this._timer.stop();
    this._timer.removeEventListener(QxConst.EVENT_TYPE_INTERVAL, this._oninterval, this);
    this._timer.dispose();
    this._timer = null;
  };

  return QxPopup.prototype.dispose.call(this);
};