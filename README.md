# fonk-previous-date-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-previous-date-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-previous-date-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-previous-date-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-previous-date-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-previous-date-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-previous-date-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

- Validate if a field of a form is previous to a certain date.

How to install it:

```bash
npm install @lemoncode/fonk-previous-date-validator --save
```

How to add it to an existing form validation schema:

We have the following form model:

```
const myFormValues = {
  product: 'shoes',
  purchaseDate: new Date('2019-02-10'),
}
```

The validator must be configured with the following required arguments:

```javascript
export interface CustomArgs {
  date: Date;
  parseStringToDateFn?: (value: string) => Date;
  inclusive?: boolean;
}
```

These are the default arguments:

```javascript
let defaultCustomArgs: CustomArgs = {
  date: null,
  parseStringToDateFn: null,
  inclusive: false,
};
```

We can add a previousDate validation to the myFormValues

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: previousDate.validator,
        customArgs: { date: new Date('2019-03-10') },
      },
    ],
  },
};
```

You can customize the error message displayed in two ways:

- Globally, replace the default error message in all validationSchemas (e.g. porting to spanish):

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

previousDate.setErrorMessage('El campo debe de ser numérico');
```

- Locally just override the error message for this validationSchema:

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: previousDate.validator,
        message: 'Error message only updated for the validation schema',
        customArgs: { date: new Date('2019-03-10') },
      },
    ],
  },
};
```

This validator compare [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date) values. If your model use dates as string format, you can provide the `parseStringToDateFn` method.

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: previousDate.validator,
        customArgs: {
          date: new Date('2019-03-10T00:00:00'),
          parseStringToDateFn: value => new Date(value),
        },
      },
    ],
  },
};
```

Or if you are using some third party library like _moment_, _date-fns_, etc:

```diff
import { previousDate } from '@lemoncode/fonk-previous-date-validator';
+ import parse from 'date-fns/parse'

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: previousDate.validator,
        customArgs: {
          date: new Date('2019-03-10T00:00:00'),
-         parseStringToDateFn: value => new Date(value),
+         parseStringToDateFn: value => parse(value, 'yyyy-MM-dd HH:mm:ss', new Date()),
        },
      },
    ],
  },
};
```

You can specify the custom arguments in two ways:

- Locally just customize the arguments for this validationSchema:

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: previousDate.validator,
        customArgs: {
          date: new Date('2019-03-10'),
          parseStringToDateFn: value => new Date(value),
        },
      },
    ],
  },
};
```

- Globally, replace the default custom arguments in all validationSchemas (e.g. enable strict types):

```javascript
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

previousDate.setCustomArgs({ parseStringToDateFn: (value) => new Date(value) ) });

// OR

previousDate.setCustomArgs({ date: new Date() });

// OR

previousDate.setCustomArgs({ inclusive: true });

// OR

previousDate.setCustomArgs({
  date: new Date(),
  parseStringToDateFn: value => new Date(value),
  inclusive: true,
});

```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
