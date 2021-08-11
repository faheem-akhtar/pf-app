import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=702%3A28
 */
export const IconThinStarTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '1 1 22 22' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
      fill='none'
    >
      <path
        d='M11.5516 3.03827C11.735 2.66665 12.265 2.66665 12.4484 3.03827L14.5518 7.30025C14.7703 7.74296 15.1926 8.04982 15.6812 8.12081L20.3846 8.80425C20.7947 8.86384 20.9584 9.36783 20.6617 9.65709L17.2583 12.9746C16.9047 13.3192 16.7434 13.8157 16.8269 14.3023L17.6303 18.9866C17.7004 19.3951 17.2717 19.7066 16.9048 19.5137L12.698 17.3021C12.261 17.0723 11.739 17.0723 11.302 17.3021L7.09516 19.5137C6.72835 19.7066 6.29963 19.3951 6.36969 18.9866L7.17312 14.3023C7.25658 13.8157 7.09525 13.3192 6.74173 12.9746L3.33833 9.6571C3.04158 9.36783 3.20533 8.86384 3.61544 8.80425L8.31881 8.12081C8.80738 8.04982 9.22973 7.74296 9.44822 7.30025L11.5516 3.03827Z'
        stroke='currentColor'
      />
    </svg>
  );
};
