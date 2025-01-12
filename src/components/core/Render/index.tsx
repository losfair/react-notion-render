import React, { useMemo } from 'react'
import { NotionBlock } from '../../../types/NotionBlock'
import getBlocksToRender from '../../../utils/getBlocksToRender'
import { indexGenerator } from '../../../utils/indexGenerator'

interface Props {
  blocks: NotionBlock[]
  useStyles?: boolean
  classNames?: boolean
  emptyBlocks?: boolean
  slugifyFn?: (text: string) => string
  simpleTitles?: boolean
}

function Render({
  blocks,
  classNames,
  emptyBlocks,
  useStyles,
  slugifyFn,
  simpleTitles
}: Props) {
  if (!blocks || !blocks.length) return <div />

  const render = useMemo(() => {
    const renderBlocks = getBlocksToRender(blocks)
    const index = indexGenerator(blocks)

    return renderBlocks.map((block) => {
      const Component = block.getComponent()

      return Component
        ? (
        <Component
          key={block.id}
          classNames={Boolean(classNames)}
          emptyBlocks={emptyBlocks}
          block={block}
          slugifyFn={slugifyFn}
          simpleTitles={simpleTitles}
          index={index}
        />
          )
        : null
    })
  }, [blocks])

  return useStyles
    ? (
    <div className='rnr-container'>{render}</div>
      )
    : (
    <React.Fragment>{render}</React.Fragment>
      )
}

export default Render
