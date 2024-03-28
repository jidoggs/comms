# Comms

## update 0.0.1

## Components

### Buttons

The Buttons have been customized to render your desired UI

#### colors

For default color of #11142D {custom-main} pass the props type default or ignore

White

```javascript
<Button type="primary">Do Something </Button>
```

Blue/Black

```javascript
<Button type="default">Do Something </Button>
<Button >Do Something </Button>
```

Transparent / Text Only

```javascript
<Button type="text">Do Something </Button>
```

#### Icon only

Pass only icon as props to the button
You can also add a description to for the icon

```javascript
<Button icon={<Icon />} />
<Button icon={<Icon />} description={"Add Cart"} />
```

#### Full Width

pass the block attribute

```javascript
<Button block>Do Something </Button>
```

#### Size

for small buttons with height of 34px or less, Add the size attribute of "small";
regular sized buttons can have the size attribute ignored

```javascript
<Button size="small">Do Something </Button>
```

Read official Docs for more detailed read https://ant.design/components/button

### Modals

#### Close Icon

if you want to remove the close Icon you can pass the hideCloseIcon Prop

```javascript
<CustomModal hideCloseIcon> ... </CustomModal>
```


Read official Docs for more detailed read https://ant.design/components/modal
