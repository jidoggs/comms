import CustomInput from '@/common/CustomInput';
import {
  DatePicker,
  Location,
  StickyNote,
  Users,
} from '@/common/components/icons';
import DatePickerAndTimeRange from './DateAndTimePicker';
import CustomButton from '@/common/components/CustomButton';

const NewMeetingModalContent = () => {
  const handleClick = () => {
    // router.push('/app/home/projects');
  };

  //   console.log('FILES', file);
  return (
    <>
      <CustomInput
        className="my-3 h-9 border-t-0 border-custom-gray_100"
        label="Name of Appointment"
        placeholder="Enter appointment name"
      />
      <div className="mb-1 flex items-center gap-1 ">
        <DatePicker size={14} />
        <p className="font-semibold">Date and Time</p>
      </div>
      <DatePickerAndTimeRange />
      <div className="my-3">
        <div className="flex items-center gap-1">
          <Location size={14} />
          <p className="font-semibold">Location</p>
        </div>
        <CustomInput
          className="h-9 border-t-0 border-custom-gray_100"
          placeholder="Add a meeting link or physical address"
        />
      </div>
      <div className="my-3">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <p className="font-semibold">Guests</p>
        </div>
        <CustomInput
          className="h-9 border-t-0 border-custom-gray_100"
          placeholder="Add people, offices, departments, comma separated"
        />
      </div>

      <div className="my-3">
        <div className="flex items-center gap-1">
          <StickyNote size={14} />
          <p className="font-semibold">Note</p>
        </div>
        <CustomInput
          type="textarea"
          className="my-2 h-9 border-t-0 border-custom-gray_100"
        />
      </div>

      <div className="mt-8 flex h-8 w-full justify-end">
        <CustomButton className="bg-custom-main" onClick={handleClick}>
          Continue
        </CustomButton>
      </div>
    </>
  );
};

export default NewMeetingModalContent;
