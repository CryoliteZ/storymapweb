/**
 * google-material-color v1.2.6
 * https://github.com/danlevan/google-material-color
 */

colorPalette = ['Red','Pink','Purple','Deep Purple','Indigo','Blue','Light Blue','Cyan','Teal','Green','Light Green', 'Lime','Yellow', 'Amber','Orange', 'Deep Orange'];
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.palette = factory();
  }
})(this, function() {
  // avoid using lodash in dependencies
  function keys(obj) {
    var keys, key;
    
    keys = [];
    
    for (var key in obj) if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
    
    return keys;
  }
  
  // avoid using lodash in dependencies
  function random(min, max) {
    return Math.floor(Math.random() * ( max - min + 1 )) + min;
  }


  return {
    palette: { 
      'Red': { 
        '0': '#FFEBEE', 
        '1': '#FFCDD2', 
        '2': '#EF9A9A', 
        '3': '#E57373', 
        '4': '#EF5350', 
        '5': '#F44336', 
        '6': '#E53935', 
        '7': '#D32F2F', 
        '8': '#C62828', 
        '9': '#B71C1C', 
        '10': '#FF8A80', 
        '11': '#FF5252', 
        '12': '#FF1744', 
        '13': '#D500', 
      },

      'Pink': { 
        '0': '#FCE4EC', 
        '1': '#F8BBD0', 
        '2': '#F48FB1', 
        '3': '#F06292', 
        '4': '#EC407A', 
        '5': '#E91E63', 
        '6': '#D81B60', 
        '7': '#C2185B', 
        '8': '#AD1457', 
        '9': '#880E4F', 
        '10': '#FF80AB', 
        '11': '#FF4081', 
        '12': '#F50057', 
        '13': '#C51162', 
      },

      'Purple': { 
        '0': '#F3E5F5', 
        '1': '#E1BEE7', 
        '2': '#CE93D8', 
        '3': '#BA68C8', 
        '4': '#AB47BC', 
        '5': '#9C27B0', 
        '6': '#8E24AA', 
        '7': '#7B1FA2', 
        '8': '#6A1B9A', 
        '9': '#4A148C', 
        '10': '#EA80FC', 
        '11': '#E040FB', 
        '12': '#D500F9', 
        '13': '#AA00FF', 
      },

      'Deep Purple': { 
        '0': '#EDE7F6', 
        '1': '#D1C4E9', 
        '2': '#B39DDB', 
        '3': '#9575CD', 
        '4': '#7E57C2', 
        '5': '#673AB7', 
        '6': '#5E35B1', 
        '7': '#512DA8', 
        '8': '#4527A0', 
        '9': '#311B92', 
        '10': '#B388FF', 
        '11': '#7C4DFF', 
        '12': '#651FFF', 
        '13': '#6200EA', 
      },

      'Indigo': { 
        '0': '#E8EAF6', 
        '1': '#C5CAE9', 
        '2': '#9FA8DA', 
        '3': '#7986CB', 
        '4': '#5C6BC0', 
        '5': '#3F51B5', 
        '6': '#3949AB', 
        '7': '#303F9F', 
        '8': '#283593', 
        '9': '#1A237E', 
        '10': '#8C9EFF', 
        '11': '#536DFE', 
        '12': '#3D5AFE', 
        '13': '#304FFE', 
      },

      'Blue': { 
        '0': '#E3F2FD', 
        '1': '#BBDEFB', 
        '2': '#90CAF9', 
        '3': '#64B5F6', 
        '4': '#42A5F5', 
        '5': '#2196F3', 
        '6': '#1E88E5', 
        '7': '#1976D2', 
        '8': '#1565C0', 
        '9': '#0D47A1', 
        '10': '#82B1FF', 
        '11': '#448AFF', 
        '12': '#2979FF', 
        '13': '#2962FF', 
      },

      'Light Blue': { 
        '0': '#E1F5FE', 
        '1': '#B3E5FC', 
        '2': '#81D4FA', 
        '3': '#4FC3F7', 
        '4': '#29B6F6', 
        '5': '#03A9F4', 
        '6': '#039BE5', 
        '7': '#0288D1', 
        '8': '#0277BD', 
        '9': '#01579B', 
        '10': '#80D8FF', 
        '11': '#40C4FF', 
        '12': '#00B0FF', 
        '13': '#0091EA', 
      },

      'Cyan': { 
        '0': '#E0F7FA', 
        '1': '#B2EBF2', 
        '2': '#80DEEA', 
        '3': '#4DD0E1', 
        '4': '#26C6DA', 
        '5': '#00BCD4', 
        '6': '#00ACC1', 
        '7': '#0097A7', 
        '8': '#00838F', 
        '9': '#006064', 
        '10': '#84FFFF', 
        '11': '#18FFFF', 
        '12': '#00E5FF', 
        '13': '#00B8D4', 
      },

      'Teal': { 
        '0': '#E0F2F1', 
        '1': '#B2DFDB', 
        '2': '#80CBC4', 
        '3': '#4DB6AC', 
        '4': '#26A69A', 
        '5': '#009688', 
        '6': '#00897B', 
        '7': '#00796B', 
        '8': '#00695C', 
        '9': '#004D40', 
        '10': '#A7FFEB', 
        '11': '#64FFDA', 
        '12': '#1DE9B6', 
        '13': '#00BFA5', 
      },

      'Green': { 
        '0': '#E8F5E9', 
        '1': '#C8E6C9', 
        '2': '#A5D6A7', 
        '3': '#81C784', 
        '4': '#66BB6A', 
        '5': '#4CAF50', 
        '6': '#43A047', 
        '7': '#388E3C', 
        '8': '#2E7D32', 
        '9': '#1B5E20', 
        '10': '#B9F6CA', 
        '11': '#69F0AE', 
        '12': '#00E676', 
        '13': '#00C853', 
      },

      'Light Green': { 
        '0': '#F1F8E9', 
        '1': '#DCEDC8', 
        '2': '#C5E1A5', 
        '3': '#AED581', 
        '4': '#9CCC65', 
        '5': '#8BC34A', 
        '6': '#7CB342', 
        '7': '#689F38', 
        '8': '#558B2F', 
        '9': '#33691E', 
        '10': '#CCFF90', 
        '11': '#B2FF59', 
        '12': '#76FF03', 
        '13': '#64DD17', 
      },

      'Lime': { 
        '0': '#F9FBE7', 
        '1': '#F0F4C3', 
        '2': '#E6EE9C', 
        '3': '#DCE775', 
        '4': '#D4E157', 
        '5': '#CDDC39', 
        '6': '#C0CA33', 
        '7': '#AFB42B', 
        '8': '#9E9D24', 
        '9': '#827717', 
        '10': '#F4FF81', 
        '11': '#EEFF41', 
        '12': '#C6FF', 
        '13': '#AEEA', 
      },

      'Yellow': { 
        '0': '#FFFDE7', 
        '1': '#FFF9C4', 
        '2': '#FFF59D', 
        '3': '#FFF176', 
        '4': '#FFEE58', 
        '5': '#FFEB3B', 
        '6': '#FDD835', 
        '7': '#FBC02D', 
        '8': '#F9A825', 
        '9': '#F57F17', 
        '10': '#FFFF8D', 
        '11': '#FFFF', 
        '12': '#FFEA', 
        '13': '#FFD6', 
      },

      'Amber': { 
        '0': '#FFF8E1', 
        '1': '#FFECB3', 
        '2': '#FFE082', 
        '3': '#FFD54F', 
        '4': '#FFCA28', 
        '5': '#FFC107', 
        '6': '#FFB3', 
        '7': '#FFA0', 
        '8': '#FF8F', 
        '9': '#FF6F', 
        '10': '#FFE57F', 
        '11': '#FFD740', 
        '12': '#FFC4', 
        '13': '#FFAB', 
      },

      'Orange': { 
        '0': '#FFF3E0', 
        '1': '#FFE0B2', 
        '2': '#FFCC80', 
        '3': '#FFB74D', 
        '4': '#FFA726', 
        '5': '#FF98', 
        '6': '#FB8C', 
        '7': '#F57C', 
        '8': '#EF6C', 
        '9': '#E651', 
        '10': '#FFD180', 
        '11': '#FFAB40', 
        '12': '#FF91', 
        '13': '#FF6D', 
      },

      'Deep Orange': { 
        '0': '#FBE9E7', 
        '1': '#FFCCBC', 
        '2': '#FFAB91', 
        '3': '#FF8A65', 
        '4': '#FF7043', 
        '5': '#FF5722', 
        '6': '#F4511E', 
        '7': '#E64A19', 
        '8': '#D84315', 
        '9': '#BF360C', 
        '10': '#FF9E80', 
        '11': '#FF6E40', 
        '12': '#FF3D', 
        '13': '#DD2C', 
      },

      'Brown': { 
        '0': '#EFEBE9', 
        '1': '#D7CCC8', 
        '2': '#BCAAA4', 
        '3': '#A1887F', 
        '4': '#8D6E63', 
        '5': '#795548', 
        '6': '#6D4C41', 
        '7': '#5D4037', 
        '8': '#4E342E', 
        '9': '#3E2723', 
      },

      'Grey': { 
        '0': '#FAFAFA', 
        '1': '#F5F5F5', 
        '2': '#EEEEEE', 
        '3': '#E0E0E0', 
        '4': '#BDBDBD', 
        '5': '#9E9E9E', 
        '6': '#757575', 
        '7': '#616161', 
        '8': '#424242', 
        '9': '#212121', 
      },

      'Blue Grey': { 
        '0': '#ECEFF1', 
        '1': '#CFD8DC', 
        '2': '#B0BEC5', 
        '3': '#90A4AE', 
        '4': '#78909C', 
        '5': '#607D8B', 
        '6': '#546E7A', 
        '7': '#455A64', 
        '8': '#37474F', 
        '9': '#263238', 
      },

      'Black': { 
        '5': '#000000', 
        'Text': 'rgba(0,0,0,0.87)', 
        'Secondary Text': 'rgba(0,0,0,0.54)', 
        'Icons': 'rgba(0,0,0,0.54)', 
        'Disabled': 'rgba(0,0,0,0.26)', 
        'Hint Text': 'rgba(0,0,0,0.26)', 
        'Dividers': 'rgba(0,0,0,0.12)', 
      },

      'White': { 
        '5': '#ffffff', 
        'Text': '#ffffff', 
        'Secondary Text': 'rgba(255,255,255,0.7)', 
        'Icons': '#ffffff', 
        'Disabled': 'rgba(255,255,255,0.3)', 
        'Hint Text': 'rgba(255,255,255,0.3)', 
        'Dividers': 'rgba(255,255,255,0.12)', 
      },

    },

    get: function (color, shade) {
      return this.palette[color][shade || '5'];
    },
    
    random: function(shade) {
      var colors, color, shades;
    
      colors = keys(this.palette);
      color = colors[random(0, colors.length - 1)];
      
      if (shade == null) {
        shades = keys(color);
        shade = shades[random(0, shades.length - 1)];
      }
      
      return this.get(color, shade);
    }
  };
});