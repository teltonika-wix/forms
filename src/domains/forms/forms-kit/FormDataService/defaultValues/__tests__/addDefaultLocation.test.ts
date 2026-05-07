import type { FormInputComponentData } from '../../../types/formDataTypes';
import type { IPAddressInfo } from '../../ipInfo';
import { addDefaultLocation } from '../addDefaultLocation';

describe('addDefaultLocation', () => {
  const mockIpInfo: IPAddressInfo = {
    countryName: 'United States',
    bogon: false,
    countryCode: '',
    ip: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add default location for LocationSelectComponent', () => {
    const mockFormInputComponents: FormInputComponentData[] = [
      { component: 'TextComponent', defaultValue: '' } as FormInputComponentData,
      { component: 'LocationSelectComponent', defaultValue: '' } as FormInputComponentData,
      { component: 'CheckboxComponent', defaultValue: '' } as FormInputComponentData,
    ];

    const result = addDefaultLocation({
      formInputComponents: mockFormInputComponents,
      ipInfo: mockIpInfo,
    });

    expect(result).toEqual([
      { component: 'TextComponent', defaultValue: '' },
      { component: 'LocationSelectComponent', defaultValue: 'United States' },
      { component: 'CheckboxComponent', defaultValue: '' },
    ]);
  });

  it('should not change components that are not LocationSelectComponent', () => {
    const mockFormInputComponents: FormInputComponentData[] = [
      { component: 'ContentComponent', defaultValue: '' } as FormInputComponentData,
      { component: 'SelectInput', defaultValue: '' } as FormInputComponentData,
    ];

    const result = addDefaultLocation({
      formInputComponents: mockFormInputComponents,
      ipInfo: mockIpInfo,
    });

    expect(result).toEqual(mockFormInputComponents);
  });
});
