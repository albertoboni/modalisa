# modalisa

![Modalisa](https://github.com/albertoboni/modalisa/blob/master/examples/img/monalisa-350x350.png "Modalisa")

A simple js object to generate modals without depending on jquery-ui or injecting too much structure html. I got tired of trying to hack jquery-ui#dialog's CSS and decided to have something simple that I could just inject some external html.


## Dependencies

Jquery +1.9


## Installation
You can use a package manager with this project or download the js files from `/dist/` manually. Either way, just make sure your add a reference to your html to `jquery.js` and `modalisa.js`

```html
<script type="text/javascript" src="<path_to_js_folder>/jquery.min.js"></script>
<script type="text/javascript" src="<path_to_js_folder>/modalisa.min.js"></script>
```


### Package managers
Just add the dependency for this repo to your `package.json` or `bower.json`:
```
{
  ...,
  "dependencies": {
      "ajax-form": "git@github.com:albertoboni/ajax-form.git"
   },
   ...
}
```


## Usage
Just call the Modalisa public methods `open()` or `openAjax()`

```javascript
// explicit html content
Modalisa.open({
    html: '<div>My content</div>',
    width: 200,
    height: 100
});

// Screen lock with a copy of content on the page
Modalisa.open({
    html_selector: '#my_target_content',
    width: 200,
    height: 100,
    screen_lock: true
});

// Simple image dialog
Modalisa.open({
    img_src: 'my_image.jpg'
});

// Simple ajax call passing values by POST
Modalisa.openAjax({
    url: 'http://www.example.com/my_page',
    method: 'post',
    data: {
      var1 : 'value',
      var2 : 'value'
    }
    width: 200,
    height: 100
});
```


### Assumptions
For the `openAjax()` method, it is expected to be returned a json object with the `html` element to be injected on the dialog:

```json
{ "html" : "<div>My dialog content here!</div>" }
```


### Rendered HTML
Whenever the dialog is opened, it generates a `<div>` for the overlay and another for the dialog:

```html
<div id="modalisa-dialog" style="display: block; position: absolute; width: 300px; height: auto; z-index: 21; top: 140px; left: 50%; margin-left: -150px;">
  <div class="modalisa-dialog-content">
      <!-- injected content -->
  </div>
</div>

<div id="modalisa-overlay"></div>
```


## Methods
| Method            | Description |
| ----------------- | ----------- |
| open(options)     | Open the dialog, at this point it will inject the wrapper and overlay HTML on the page. |
| openAjax(options) | Expects the `url` option, using the HTTP method specified on the option `method` and send the values in `data`. Expects a json response with `html` entry |
| close()           | Closes the dialog. It is automatically bound to the onClick of the overlay and to the `esc` keyboard key. It will be disabled if the option `screen_lock` is `true` |


## Options
| Name            | Value    | Default      | Description |
| --------------- | -------- | ------------ | ----------- |
| position        | String   | `"absolute"` | The CSS `position` value for the dialog |
| width           | Numeric  | `"auto"`     | The CSS width of the dialog |
| height          | Numeric  | `"auto"`     | The CSS height of the dialog |
| top             | Numeric  | `null`       | The CSS top of the dialog |
| url             | String   | `null`       | The url for the `openAjax()` request |
| method          | String   | `"get"`      | The http method for the `openAjax()` request. Accepted values: `get`, `post`  |
| data            | Object   | `{}`         | The data to be sent on the `openAjax()` request |
| screen_lock     | Boolean  | `false`      | If set to `true` it will deactivate the `close()` method, making the dialog unclosable |
| html            | String   | `null`       | HTML to be injected on the dialog |
| html_selector   | String   | `null`       | The jQuery selector to of element to be copied and injected. It overrides the `html` option |
| img_src         | String   | `null`       | The image source of an image tag to be injected on the dialog. It overrides the `html` option |



## Examples
You can find simple usages in the [examples folder](https://github.com/albertoboni/ajax-form/tree/master/examples).


## TODO
For the next version:
- Injection of close button on the dialog template
- Override dialog template
- Option to make the dialog draggable
- More examples, MOAR!


## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/albertoboni/ajax-form.
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License
This script is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
