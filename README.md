#Tableau Widget

Tableau widget developed using 
- jQuery
- jQuery.ui
- Bootstrap
```
Bower has been used for library management.
```
**Module**
* $.interactionManager: layer between tableauSoftware and tableauWidget ($.widgetManager)
* $.widgetManager: manage widget, create widget _and_ assign widget to HTML methods
* $.infoManager: provide information to the user and for $.widgetManager 

```
$.infoManager can be used by the user/dev to study the filters data and decide what kind of HTML element that they want the widget to be displayed
```
**Custom Widget**
* tableau.checkboxWidget
* tableau.radioWidget
* tableau.selectWidget

```
you can customize a new widget using widget factory $.widget
```
**CSS organization**
- we used BootStrap as base CSS and write our custom style in style/custom-style.css

```
planning to use SASS-Compass
```

