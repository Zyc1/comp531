import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {isCombinedNodeFlagSet} from 'tslint';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      imports: [HttpClientModule, FormsModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.posts = [
      {
        'text': 'Jelly apple pie oat cake I love gingerbread. Foot cotton candy I love cake sucks chups fruitcake. ' +
          'Caramels oat cake candy candy chupa chups apple pie jujubes. ' +
          'Gummi bears cake I love tiramisu ice cream sweet roll icing. Marzipan sesame snaps I love sweet cake toffee bear claw jelly. ' +
          'Biscuit donut I love pudding sweet roll chocolate bar tart.',
        'img': 'https://picsum.photos/300/220?image=372',
        'author': 'Matthew',
        'avatar': '../../images/matthew.png',
        'timestamp': '05-06-2018',
        'comments': [
          {
            'name': 'Jenny',
            'reply': 'Revolutionary!',
            'img': '../../images/jenny.jpg'
          }
        ]
      },
      {
        'text': 'Sweet wafer pudding pudding tootsie roll gingerbread tootsie roll jelly-o oat cake. ' +
          'Carrot cake wafer oat cake ice cream icing. Marshmallow muffin sweet roll candy liquorice souffle powder dragée.',
        'img': 'https://picsum.photos/300/220?image=835',
        'author': 'Molly',
        'avatar': '../../images/molly.png',
        'timestamp': '02-18-2018',
        'comments': [
          {
            'name': 'Matthew',
            'reply': 'I\'m very interested in this.',
            'img': '../../images/matthew.png'
          },
          {
            'name': 'Stevie',
            'reply': 'Awesome!',
            'img': '../../images/stevie.jpg'
          }
        ]
      }
      ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch articles for current logged in user', () => {
    localStorage.setItem('username', 'Kristy');
    component.fetchArticles(localStorage.getItem('username')).then(res => {
      expect(Object.values(res).length).toBe(2);
      for (let i = 0; i < Object.values(res).length; i++) {
        expect(res[i].author).toBe('Kristy');
      }
    });
  });

  it('should update the search keyword', function () {
    // component.fetchArticles();
    expect(component.updateKeyword('Biscuit')).toBe('Biscuit');
  });

  it('should filter displayed articles by the search keyword', () => {
    localStorage.setItem('username', 'Matthew');
    expect(component.search('Biscuit')).toBe(1);
  });

  it('should add articles when adding a follower', () => {
    console.log(component.updateArticles('Matthew', 1));
  });

  it('should remove articles when remove a follower', () => {
    expect(component.updateArticles('Molly', 0)).toBe(1);
  });
});
