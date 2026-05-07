import { mount, shallowMount } from '@vue/test-utils';
import Search from '../Search.vue';

describe('Search Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Search, {
      propsData: {
        modelValue: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('opens input and fills it', async () => {
    const wrapper = shallowMount(Search, {
      propsData: {
        modelValue: '',
      },
    });
    await wrapper.find('input').setValue('super-value');
    await wrapper.find('input').trigger('input');

    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual(['super-value']);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('prefills value', async () => {
    const wrapper = shallowMount(Search, {
      propsData: {
        modelValue: 'Hello world!',
      },
    });

    const inputElement = wrapper.find('input');
    expect(inputElement.element.value).toBe('Hello world!');
  });

  it('emits correct events when input value changes', async () => {
    const wrapper = mount(Search, {
      propsData: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('test');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper?.emitted('update:modelValue')?.[0]).toEqual(['test']);
  });

  it('clears input with debounce', async () => {
    const wrapper = mount(Search, {
      propsData: {
        modelValue: 'some value',
        debounce: 600,
      },
    });
    await wrapper.find('button[aria-label="Clear search input"]').trigger('keydown.alt.esc');

    setTimeout(() => {
      expect(wrapper.find('input').element.value).toBe('');
    }, 700);
  });
});
