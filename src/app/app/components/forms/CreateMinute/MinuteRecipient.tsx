import dynamic from 'next/dynamic';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import CloseCircle from '@/common/components/icons/CloseCircle';
import Recipient from '@/app/app/components/Recipient';

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });

type RespProps = {
  title: string;
  name: string;
  mode?: 'multiple';
  actionHandler: () => void;
  showAction?: boolean;
};

const MinuteRecipient = (props: RespProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 p-2">
      <Title className="w-24 pr-2">{props.title}</Title>
      <FormItem
        name={props.name}
        className="!m-0 flex w-full flex-col"
        rules={[{ required: true }]}
      >
        <Recipient
          className="!border-none !bg-custom-white_100"
          rootClassName="!border-none !bg-custom-white_100"
          mode={props.mode}
        />
      </FormItem>
      {props.mode === 'multiple' ? (
        <CustomButton
          size="small"
          onClick={props.actionHandler}
          className="!bg-custom-red_100"
        >
          <CloseCircle />
        </CustomButton>
      ) : null}
      {props.showAction ? (
        <CustomButton
          title="Attach"
          type="text"
          className="hover:!bg-none"
          onClick={props.actionHandler}
          size="small"
        >
          Attach
        </CustomButton>
      ) : null}
    </div>
  );
};

export default MinuteRecipient;
