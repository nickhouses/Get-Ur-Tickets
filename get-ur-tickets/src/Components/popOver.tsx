import Anchor from "react-bootstrap/Anchor";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

/* Variables to use within the popover box */
interface DetailsPopoverProps {
    name:   string;
    header: string;
    line1:  string;
    line2:  string;
}

/* Change 'trigger' to click or hover, whichever is decided. */
const DetailsPopover: React.FC<DetailsPopoverProps> = ({ name, header, line1, line2 }) => {
  return (
    <OverlayTrigger
        trigger="click" 
        placement="right"
        overlay={
        <Popover className="details-popover">
            {/* Format the variables here */}
            <Popover.Header as="h3">{header}</Popover.Header>
            <Popover.Body>{line1}</Popover.Body>
            <Popover.Body>{line2}</Popover.Body>
        </Popover>
      }
    >
        <Anchor className="text-success">{name}</Anchor>
    </OverlayTrigger>
  );
};

export default DetailsPopover;
