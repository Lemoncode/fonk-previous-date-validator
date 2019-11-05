import { createFormValidation } from '@lemoncode/fonk';
import { previousDate } from '@lemoncode/fonk-previous-date-validator';

const validationSchema = {
  field: {
    myField: [
      {
        validator: previousDate.validator,
        customArgs: { date: new Date('2019-03-10') },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

Promise.all([
  formValidation.validateField('myField', new Date('2019-04-10')),
  formValidation.validateField('myField', new Date('2019-02-10')),
]).then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example with failed result:</h2>

<pre>
  formValidation.validateField('myField', new Date('2019-04-10'))
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;">
  <h2>Example with succeeded result:</h2>

<pre>
formValidation.validateField('myField', new Date("2019-02-10"))
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
`;
});
