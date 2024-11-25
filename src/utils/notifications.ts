import { Member, FellowshipCenter } from '../types';

export const generateWhatsAppMessage = (member: Member, center: FellowshipCenter) => {
  const message = `
*New House Fellowship Member Registration*

*Personal Details*
📝 Name: ${member.fullName}
📧 Email: ${member.email}
📱 Phone: ${member.phone}
🎂 Birthday: ${member.birthday}
✝️ Membership: ${member.membershipLevel}
👥 Group: ${member.group}
💑 Marital Status: ${member.maritalStatus}

*Location Details*
📍 Address: ${member.address}
${member.street ? `🛣️ Street: ${member.street}` : ''}

*Fellowship Assignment*
⛪ Center: ${center.name}
📍 Center Address: ${center.location.address}

_Please reach out to welcome our new member!_
`.trim();

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = center.pastor.phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${phoneNumber.startsWith('0') ? '234' + phoneNumber.slice(1) : phoneNumber}?text=${encodedMessage}`;
};