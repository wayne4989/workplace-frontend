import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Output
} from '@angular/core';
import {
  EmitterService
} from '../emitter/emitter.component';

declare let tinymce: any;
declare let swal: any;
@Component({
  selector: 'app-post-poll-map',
  templateUrl: './post-poll-map.component.html',
  styleUrls: ['./post-poll-map.component.scss']
})
export class PostPollMapComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor () {}

  @Input() private post = false;
  @Input() private poll = false;
  @Input() private map = false;
  @Input() private story = false;
  @Input() private full = false;
  @Input() private elementId: String;
  @Output() private onEditorKeyup = new EventEmitter<any>();

  private editor;
  // private newPoll: PollModel = new PollModel();
  private errorMessage: any;
  private isDisabled = false;
  private postSaveEmitterService = EmitterService.get('postSaveEmitter');

  public ngOnInit (): void {}

  public ngAfterViewInit (): void {
    tinymce.init({
      selector: '#share-story-textarea',
      plugins: ['link', 'paste'],
      max_height: 300,
      menubar: false,
      toolbar: 'bold italic save attach',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.addButton('attach', {
          text: false,
          icon: 'upload',
          onclick: (): void => {
            let fileToUpload = $('form.share-story').find('input.fileToUpload');
            fileToUpload.click();
            fileToUpload.bind('change', function (): void {
              let str = 'File: ' + fileToUpload.val().toString();
              if (str.length > 22) {
                let str_start = str.substr(0, 12) + '...';
                str = str_start + str.substr(16, 22);
              }

              $('form.share-story').find('span#file_text').html(str);
              $('form.share-story').find('button.clear_file').removeClass('hidden');
            });
          }
        });
        editor.addButton('save', {
          text: 'SHARE',
          icon: false,
          onclick: function (): void {
            $('form.share-story').submit();
          }
        });
        editor.on('init', function (evt): void {
          let toolbar = $(evt.target.editorContainer)
            .find('>.mce-container-body >.mce-top-part');
          let currentEditor = $(evt.target.editorContainer)
            .find('>.mce-container-body >.mce-edit-area');

          // switch the order of the elements
          toolbar.detach().insertAfter(currentEditor);

          this.dom.setStyle(this.dom.select('body'), 'background-color', '#f9f9f9');

          if (this.getContent() === '') {
            this.setContent(`<p id='placeholder' style='color: #989898;'>Tell your story...</p>`);
          }
        });

        editor.on('focus', function (): void {
          this.dom.remove(this.dom.select('p#placeholder'));
        });

        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  public ngOnDestroy (): void {
    tinymce.remove(this.editor);
  }

  protected postLink (e): void {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected brainLink (e): void {
    $('.create-post, .create-poll, .timeline-block, .ask-question').hide();
    $('.brain-map').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected pollLink (e): void {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected shareStoryLink (e): void {
    $('.create-post, .brain-map, .ask-question, .create-poll').hide();
    $('.share-story').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected addPoll (): void {
    const currentchildren = $('.poll-option').children().length;
    if (currentchildren < 4) {
      const poll = `
        <li>
          <input type='text' placeholder='Add an option' />
        </li>`;
      $('.poll-option').append(poll);
    } else {
      this.errorMessage = 'Maximum of 4 options are permitted';
    }
  }

  protected createpoll (): void {
    let options = [];
    $('.poll-option >> :input').each(function (a, b): void {
      options.push($(b).val());
    });

    // this.newPoll['options'] = options;
    // this.postservice.createPoll(this.newPoll).subscribe(resp => {
    //   if (resp['error'] === false) {
    //     alert(resp['Message']);
    //   } else {
    //     console.log(resp);
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }

  protected createpost (): void {
    /*Disable post button after submit to prevent post duplication*/
    this.isDisabled = true;
    if ($('.create-pots-textarea').val() === '') {
      swal('Oops', 'Empty Content', 'error');
      this.isDisabled = false;
    } else {
      // this.postservice.createPost(this.newPost).subscribe((response: any) => {
      //   swal('Sucess', 'Post Created Successfully', 'success');
      //   $('.create-pots-textarea').val('');
      //   this.isDisabled = false;
      //   this.postSaveEmitterService.emit(response.postId);
      // }, error => {
      //   this.isDisabled = false;
      //   if (error['error'].body) {
      //     swal('Oops', error['error'].body.status_message, 'error');
      //   } else {
      //     swal('Oops', error['error'].status_message, 'error');
      //   }
      // });
    }
  }

  protected addstory (): void {
    // this.postservice.createstory(this.newStory).subscribe((response: any) => {
    //   console.log(response);
    // });
  }

  protected clearFile (): void {
    // $('form.share-story').find('input.fileToUpload').val('')
    // $('form.share-story').find("span#file_text").html('');
    // $('form.share-story').find('button.clear_file').addClass('hidden');
  }
}
