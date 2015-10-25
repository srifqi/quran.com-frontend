'use strict';
import React from 'react';
import Ayah from 'components/surah/Ayah';
import Line from 'components/surah/Line';
import AyahsStore from 'stores/AyahsStore';
import Loader from 'components/Loader';
import {connectToStores} from 'fluxible-addons-react';
import debug from 'utils/Debug';

class AyahsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  list() {
    if (this.props.ayahs.length === 0) {
      return <Loader />;
    }

    if (this.props.isReadingMode) {
      return this.props.lines.map((line, index) => {
        return <Line line={line} key={`${index}-line`} />;
      });
    }
    else {
      return this.props.ayahs.map(ayah => {
        return <Ayah ayah={ayah}
                     key={`${ayah.surah_id}-${ayah.ayah_num}-ayah`}
                     readingMode={this.props.isReadingMode}
                     isSearch={this.props.isSearch} />;
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ayahs.length === 0) {
      return true;
    }

    return (this.props.ayahs.length === nextProps.ayahs.length) ||
           (this.props.isReadingMode !== nextProps.isReadingMode);
  }

  render() {
    debug('COMPONENT-AYAHSLIST');

    if (this.props.isReadingMode) {
      return (
        <h1 className="word-font text-justify">
          {this.list()}
        </h1>
      );
    }

    return (
      <div>
        {this.list()}
      </div>
    );
  }
}

AyahsList.displayName = 'AyahsList';

AyahsList.contextTypes = {
  getStore: React.PropTypes.func.isRequired
};

AyahsList = connectToStores(AyahsList, [AyahsStore], (context, props) => {
  const ayahsStore = context.getStore(AyahsStore);

  return {
    ayahs: ayahsStore.getAyahs(),
    isReadingMode: ayahsStore.isReadingMode(),
    lines: ayahsStore.getLines()
  };
});

export default AyahsList;
