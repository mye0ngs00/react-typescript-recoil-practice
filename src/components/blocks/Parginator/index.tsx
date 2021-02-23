import React, { ReactElement } from 'react'
import { useRecoilState } from 'recoil'
import { ArticlesState } from '../../../atoms'
import ParginationButton from './ParginationButton'

const Parginator = (): ReactElement => {
  const [config, setConfig] = useRecoilState(ArticlesState.config)
  const center = config.page > 2 ? config.page : 3

  const moveTo = (page: number): void => {
    setConfig({
      ...config,
      page,
    })
  }
  const moveToFirst = () => moveTo(1)
  const moveToPrev = () => moveTo(config.page > 1 ? config.page - 1 : 1)
  const moveToNext = () => moveTo(config.page + 1)
  const moveToLast = () => moveTo(50)

  return (
    <div className="pagination">
      <ul>
        <ParginationButton
          isActive={false}
          isArrow={true}
          onClickButton={moveToFirst}
          label="Go to first page"
          imageClass="fas fa-angle-double-left"
        />
        <ParginationButton
          isActive={false}
          isArrow={true}
          onClickButton={moveToPrev}
          label="Go to previous page"
          imageClass="fas fa-angle-left"
        />
        {[center - 2, center - 1, center, center + 1, center + 2].map((element) => (
          <ParginationButton
            key={element}
            isActive={element === config.page}
            isArrow={false}
            onClickButton={() => moveTo(element)}
            label={`Go to page number ${element}`}
            number={element}
          />
        ))}
        <ParginationButton
          isActive={false}
          isArrow={true}
          onClickButton={moveToNext}
          label="Go to next page"
          imageClass="fas fa-angle-right"
        />
        <ParginationButton
          isActive={false}
          isArrow={true}
          onClickButton={moveToLast}
          label="Go to last page"
          imageClass="fas fa-angle-double-right"
        />
      </ul>
    </div>
  )
}

export default Parginator
