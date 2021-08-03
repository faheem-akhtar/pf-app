import { GalleryScrollActionType } from '../action.type';
import { GalleryScrollBrowseEnum } from '../browse.enum';
import { GalleryScrollItemInterface } from '../item.interface';
import { galleryScrollMakeInitialState } from '../make-initial-state';
import { galleryScrollMakeReducer } from '../make-reducer';

describe('galleryScrollMakeReducer', () => {
  const image1: GalleryScrollItemInterface = { sourceUrl: '1' };
  const image2: GalleryScrollItemInterface = { sourceUrl: '2' };
  const image3: GalleryScrollItemInterface = { sourceUrl: '3' };
  const initialState3Images = galleryScrollMakeInitialState([image1, image2, image3], false);

  const reducer = galleryScrollMakeReducer(false, 3);
  const rtlReducer = galleryScrollMakeReducer(true, 3);

  it('return original state when action not matching any condition', () => {
    const result = reducer(initialState3Images, {} as GalleryScrollActionType);

    expect(result).toBe(initialState3Images);
  });

  describe('on start', () => {
    it('on the left should set browse to prev', () => {
      const result = reducer(initialState3Images, { type: 'start', positionX: 10, galleryLeft: 0, galleryRight: 100 });

      expect(result.isDragging).toBe(false);
      expect(result.pointerPositionStart).toBe(10);
      expect(result.pointerPositionCurrent).toBe(10);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.previous);
      expect(result.isTouched).toBe(true);
    });

    it('on the right should set browse to next', () => {
      const result = reducer(initialState3Images, { type: 'start', positionX: 50, galleryLeft: 0, galleryRight: 100 });

      expect(result.browse).toBe(GalleryScrollBrowseEnum.next);
    });
  });

  describe('on move', () => {
    it('should ignore action if not dragging', () => {
      const result = reducer(initialState3Images, { type: 'move', positionX: 50 });

      expect(result).toBe(initialState3Images);
    });

    it('should set pointerPositionCurrent', () => {
      const result = reducer({ ...initialState3Images, pointerPositionStart: 5 }, { type: 'move', positionX: 50 });

      expect(result.pointerPositionCurrent).toBe(50);
    });

    it('should set pointerPositionCurrent but should not start dragging', () => {
      const result = reducer({ ...initialState3Images, pointerPositionStart: 5 }, { type: 'move', positionX: 6 });

      expect(result.isDragging).toBe(false);
      expect(result.pointerPositionCurrent).toBe(6);
    });

    it('should set pointerPositionCurrent', () => {
      const result = reducer({ ...initialState3Images, pointerPositionStart: 5 }, { type: 'move', positionX: 50 });

      expect(result.isDragging).toBe(true);
      expect(result.pointerPositionCurrent).toBe(50);
    });
  });

  describe('on end', () => {
    it('should ignore action if pointerPositionCurrent is not set', () => {
      const result = reducer(initialState3Images, { type: 'end' });

      expect(result).toBe(initialState3Images);
    });

    it('click on left should move the index to second item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          browse: GalleryScrollBrowseEnum.next,
          pointerPositionStart: 5,
          pointerPositionCurrent: 5,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(1);
    });

    it('click on left should move the index to last item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          browse: GalleryScrollBrowseEnum.previous,
          pointerPositionStart: 5,
          pointerPositionCurrent: 5,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(2);
    });

    it('drag to left should move the index to seconds item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          pointerPositionStart: 50,
          pointerPositionCurrent: 40,
          isDragging: true,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(1);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.next);
    });

    it('drag to right should move the index to prev item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          pointerPositionStart: 40,
          pointerPositionCurrent: 50,
          isDragging: true,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(2);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.previous);
    });

    describe('rtl', () => {
      it('click on left should move the index to last item', () => {
        const result = rtlReducer(
          {
            ...initialState3Images,
            browse: GalleryScrollBrowseEnum.next,
            pointerPositionStart: 5,
            pointerPositionCurrent: 5,
          },
          { type: 'end' }
        );

        expect(result.activeIndex).toBe(2);
      });

      it('click on left should move the index to second item', () => {
        const result = rtlReducer(
          {
            ...initialState3Images,
            browse: GalleryScrollBrowseEnum.previous,
            pointerPositionStart: 5,
            pointerPositionCurrent: 5,
          },
          { type: 'end' }
        );

        expect(result.activeIndex).toBe(1);
      });
    });
  });
});
