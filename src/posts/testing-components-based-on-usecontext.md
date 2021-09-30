---
title: Testing components based on useContext
date: 2021-09-30
language: en
---

Let’s take a look at how to test a react component that is dependent on useContext hook. A popular React pattern used in UI libraries is the **Compound Component** pattern. This pattern allows writing a declarative and flexible API for complex components. You build the component using multiple loosely coupled child components. Each of them performs a different task, yet they all share the same implicit state. When put together, these child components make up our compound component.

Let's see a real frontend code in one of our projects. In the request help project, we have a kind of accordion to show different content based on the user's choice. This component uses the pattern described above, defining a reducer to manage the state and a context to decouple components avoiding props drilling.

We have a folder with these files:

```
Accordion
  |
  |_ index.js
  |_ Accordion.jsx
  |_ AccordionItem.jsx
  |_ reducer.js
  |_ context.js
  |_ styles.module.less
```

The reason to create a module with the context alone is to avoid a cycle dependency. The base Accordion component will use the context provider to create... the context. And the AccordionItem sub-component will use the context to access defined by the parent. If we create the context in the Accordion component, the cycle dependency happens when the subcomponent imports from the parent and the parent imports the subcomponent.

So our `context.js` file has this code:

```
import { createContext, useContext } from 'react';

const AccordionContext = createContext();

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('useAccordion must be used within a Accordion provider');
  }
  return context;
};

export default AccordionContext.Provider;
```

Instead of exporting the full context, we create a custom hook to be consumed. Also, just the provider it's exported by default.

Our reducer is just a normal reducer:

```
export const ACTIONS = {
  SELECT: 'select'
};

const selectChild = (state, action) => ({
  ...state,
  selected: action.payload.item
});

export default {
  [ACTIONS.SELECT]: selectChild
};
```

Let's see how it looks like our base Accordion component:

```
import React, { useReducer, Children, cloneElement } from 'react';
import { nanoid } from 'nanoid';

import createReducer from 'Services/createReducer';
import reducer from 'Components/Accordion/reducer';
import AccordionProvider from 'Components/Accordion/context';
import AccordionItem from 'Components/Accordion/AccordionItem';

import styles from 'Components/Accordion/styles.module.less';

const Accordion = ({ children, selected }) => {
  const name = nanoid();
  const initialState = {
    selected
  };

  const [state, dispatch] = useReducer(createReducer(initialState, reducer), initialState);

  return (
    <AccordionProvider value={{ state, dispatch }}>
      <div className={styles.accordion} data-testid="accordion">
        {Children.map(children, (c) =>
          cloneElement(c, {
            name
          })
        )}
      </div>
    </AccordionProvider>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
```

For brevity, I'm leaving out of context all the prop types validation and some properties like the usual onChange handler. As you see, our Accordion component just creates the initial state using our createReducer service (the one we use to define reducers in redux), imports the provider, and iterates through its children to inject a unique id (to allow only one radio checked) and then renders them. It's important to notice that the context value is right the full state and the dispatch function created by the `useReducer`. This will allow subcomponents to dispatch actions directly.

And finally, our `AccordionItem` component:

```
import React from 'react';
import cx from 'classnames';

import { useAccordion } from 'Components/Accordion/context';
import { ACTIONS } from 'Components/Accordion/reducer';

import styles from 'Components/Accordion/styles.module.less';

const Item = ({ children, name, id, label, className }) => {
  const { state, dispatch } = useAccordion();

  const onChange = () => {
    dispatch({
      type: ACTIONS.SELECT,
      payload: {
        item: id
      }
    });
  };

  return (
    <div
      data-testid="accordion-item"
      className={cx(styles.item, {
        [className]: !!className
      })}
    >
      <div className={styles.control}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="radio"
          name={name}
          onChange={onChange}
          checked={state.selected === id}
        />
      </div>

      {state.selected === id && <div>{children}</div>}
    </div>
  );
};

export default Item;
```

Nothing fancy. Our item component uses the context to consume the `state` and the `dispatch` function to trigger actions. If the `selected` state matches with its `id` then the content it's rendered.

Cool. Let's go with the test part. We will focus on the `AccordionItem` component's tests, because that's what this post is all about. Let's write a simple test to check the component renders properly:

```
import React from 'react';
import { render, screen } from '@testing-library/react';

import AccordionItem from 'RequestHelp/components/Accordion/AccordionItem';

describe('Accordion item', () => {
  test('should render properly', () => {
    render(
      <AccordionItem id="wadus" label="Wadus">
        <div data-testid="content">Wadus content</div>
      </AccordionItem>
    );

    expect(screen.getByTestId('accordion-item')).toBeInTheDocument();
    expect(screen.getByText('Wadus')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
```

If you try to run this test, you will get an error like:

```
useAccordion must be used within a Accordion provider
```

Let's try to mock the context importation. It should be nice to be able to access to the properties returned by the context hook, this way we can test if the `dispatch` is called and different test cases manipulating the `state`. Our fitst approach would be something like:

```
const context = {
  state: {},
  dispatch: jest.fn()
};

jest.mock('RequestHelp/components/Accordion/context', () => ({
  useAccordion: jest.fn().mockReturnValue(context)
}));
```

but this doesn't seem to make jest happy, we get this error:

```
The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables.
Invalid variable access: context
```

But what if, instead of mocking the whole module, we try to mock only the hook? This is the perfect use case for `jest.spyOn`:

```
const context = {
  state: {},
  dispatch: jest.fn()
};

jest.spyOn(AccordionContext, 'useAccordion').mockReturnValue(context);
```

There you go, all green! With this approach, we can test easily different test scenarios, adapting the mock to our needs:

```
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AccordionItem from 'RequestHelp/components/Accordion/AccordionItem';
import * as AccordionContext from 'RequestHelp/components/Accordion/context';

const context = {
  state: {},
  dispatch: jest.fn()
};

describe('Accordion item', () => {
  let mock;

  beforeEach(() => {
    mock = jest.spyOn(AccordionContext, 'useAccordion').mockReturnValue(context);
  });

  test('should render properly', () => {
    render(
      <AccordionItem id="wadus" label="Wadus">
        <div data-testid="content">Wadus content</div>
      </AccordionItem>
    );

    expect(screen.getByTestId('accordion-item')).toBeInTheDocument();
    expect(screen.getByText('Wadus')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('should dispatch actions properly', () => {
    render(
      <AccordionItem id="wadus" label="Wadus">
        <div data-testid="content">Wadus content</div>
      </AccordionItem>
    );

    fireEvent.click(screen.getByText('Wadus'));
    expect(context.dispatch).toHaveBeenCalledWith({
      payload: { item: 'wadus' },
      type: 'select'
    });
  });

  test('should show content render properly', () => {
    mock.mockReturnValue({
      ...context,
      state: {
        selected: 'wadus'
      }
    });

    render(
      <AccordionItem id="wadus" label="Wadus">
        <div data-testid="content">Wadus content</div>
      </AccordionItem>
    );

    expect(screen.getByText('Wadus content')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
```

