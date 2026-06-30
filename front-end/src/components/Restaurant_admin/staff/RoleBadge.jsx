
import React from 'react'

const RoleBadge = ({ role }) => {
  return (
    <span className="bg-neutral-100 text-on-surface font-label-caps text-[11px] px-sm py-1 rounded uppercase tracking-wider">
      {role}
    </span>
  )
}

export default RoleBadge