import React from 'react'
import { Card, Icon, Image ,Statistic,Label,Button} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>澳门皇家赌场</Card.Header>
            <Card.Meta>
                <p>管理员地址:</p>
                <Label>
                    {props.manager}
                </Label>
                <p>当前地址:</p>
                <Label>
                    {props.account}
                </Label>
            </Card.Meta>
            <Card.Description>
                每晚八点准时开奖！
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.playersCount} 人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='violet'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href="#">点击查看交易历史</a>
            </Statistic>
        </Card.Content>
        <Button animated='fade' color='orange' onClick={props.play} disabled={props.isPlaying}>
            <Button.Content visible disabled={props.isPlaying}>点击此处放飞梦想</Button.Content>
            <Button.Content hidden disabled={props.isPlaying}>投入1ETH</Button.Content>
        </Button>
        <Button negative onClick={props.draw} style={{display : props.isShowButton}}>开奖</Button>
        <Button positive onClick={props.drawback} style={{display : props.isShowButton}}>退钱</Button>
    </Card>
);

export default CardExampleCard