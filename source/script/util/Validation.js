/* ************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#package(core)

************************************************************************ */

/*
---------------------------------------------------------------------------
  VALUE VALIDATION
---------------------------------------------------------------------------
*/

qx.util.Validation = {};

/*
  All methods use the strict comparison operators as all modern
  browsers (needs support for JavaScript 1.3) seems to support this.

  http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Operators:Comparison_Operators
*/

qx.util.Validation.isValid = function(v)
{
  switch(typeof v)
  {
    case QxConst.TYPEOF_UNDEFINED:
      return false;

    case QxConst.TYPEOF_OBJECT:
      return v !== null;

    case QxConst.TYPEOF_STRING:
      return v !== QxConst.CORE_EMPTY;

    case QxConst.TYPEOF_NUMBER:
      return !isNaN(v);

    case QxConst.TYPEOF_FUNCTION:
    case QxConst.TYPEOF_BOOLEAN:
      return true;
  };

  return false;
};

qx.util.Validation.isInvalid = function(v)
{
  switch(typeof v)
  {
    case QxConst.TYPEOF_UNDEFINED:
      return true;

    case QxConst.TYPEOF_OBJECT:
      return v === null;

    case QxConst.TYPEOF_STRING:
      return v === QxConst.CORE_EMPTY;

    case QxConst.TYPEOF_NUMBER:
      return isNaN(v);

    case QxConst.TYPEOF_FUNCTION:
    case QxConst.TYPEOF_BOOLEAN:
      return false;
  };

  return true;
};

qx.util.Validation.isValidNumber = function(v) {
  return typeof v === QxConst.TYPEOF_NUMBER && !isNaN(v);
};

qx.util.Validation.isInvalidNumber = function(v) {
  return typeof v !== QxConst.TYPEOF_NUMBER || isNaN(v);
};

qx.util.Validation.isValidString = function(v) {
  return typeof v === QxConst.TYPEOF_STRING && v !== QxConst.CORE_EMPTY;
};

qx.util.Validation.isInvalidString = function(v) {
  return typeof v !== QxConst.TYPEOF_STRING || v === QxConst.CORE_EMPTY;
};

qx.util.Validation.isValidArray = function(v) {
  return typeof v === QxConst.TYPEOF_OBJECT && v !== null && v instanceof Array;
};

qx.util.Validation.isInvalidArray = function(v) {
  return typeof v !== QxConst.TYPEOF_OBJECT || v === null || !(v instanceof Array);
};

qx.util.Validation.isValidObject = function(v) {
  return typeof v === QxConst.TYPEOF_OBJECT && v !== null && !(v instanceof Array);
};

qx.util.Validation.isInvalidObject = function(v) {
  return typeof v !== QxConst.TYPEOF_OBJECT || v === null || v instanceof Array;
};

qx.util.Validation.isValidNode = function(v) {
  return typeof v === QxConst.TYPEOF_OBJECT && v !== null;
};

qx.util.Validation.isInvalidNode = function(v) {
  return typeof v !== QxConst.TYPEOF_OBJECT || v === null;
};

qx.util.Validation.isValidElement = function(v) {
  return typeof v === QxConst.TYPEOF_OBJECT && v !== null || v.nodeType !== 1;
};

qx.util.Validation.isInvalidElement = function(v) {
  return typeof v !== QxConst.TYPEOF_OBJECT || v === null || v.nodeType !== 1;
};

qx.util.Validation.isValidFunction = function(v) {
  return typeof v === QxConst.TYPEOF_FUNCTION;
};

qx.util.Validation.isInvalidFunction = function(v) {
  return typeof v !== QxConst.TYPEOF_FUNCTION;
};

qx.util.Validation.isValidBoolean = function(v) {
  return typeof v === QxConst.TYPEOF_BOOLEAN;
};

qx.util.Validation.isInvalidBoolean = function(v) {
  return typeof v !== QxConst.TYPEOF_BOOLEAN;
};

qx.util.Validation.isValidStringOrNumber = function(v)
{
  switch(typeof v)
  {
    case QxConst.TYPEOF_STRING:
      return v !== QxConst.CORE_EMPTY;

    case QxConst.TYPEOF_NUMBER:
      return !isNaN(v);
  };

  return false;
};

qx.util.Validation.isInvalidStringOrNumber = function(v)
{
  switch(typeof v)
  {
    case QxConst.TYPEOF_STRING:
      return v === QxConst.CORE_EMPTY;

    case QxConst.TYPEOF_NUMBER:
      return isNaN(v);
  };

  return false;
};
